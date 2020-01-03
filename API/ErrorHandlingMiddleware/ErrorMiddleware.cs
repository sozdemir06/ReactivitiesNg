using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Application.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;


namespace API.ErrorHandlingMiddleware
{
    public class ErrorMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorMiddleware> _logger;
        public ErrorMiddleware(RequestDelegate next, ILogger<ErrorMiddleware> logger)
        {
            _logger = logger;
            _next = next;

        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {

                await HandleExceptionAsync(context, ex, _logger);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception ex, ILogger<ErrorMiddleware> logger)
        {
              object errors=null;
              switch (ex)
              {
                  case RestException re:
                  _logger.LogError(ex,"Rest Error");
                  errors=re.Errors;
                  context.Response.StatusCode=(int)re.Code;
                  break;
                  case Exception e:
                  logger.LogError(ex,"Server Error");
                  errors=string.IsNullOrWhiteSpace(e.Message)?"Error":e.Message;
                  context.Response.StatusCode=(int)HttpStatusCode.InternalServerError;
                  break;
                  
                  
              }

              context.Response.ContentType="application/json";
              if(errors!=null)
              {
                  var result=JsonSerializer.Serialize(new{
                      errors
                  });

                  await context.Response.WriteAsync(result);
              }

              
        }
    }
}