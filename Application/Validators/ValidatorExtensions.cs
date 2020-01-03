using FluentValidation;

namespace Application.Validators
{
    public static class ValidatorExtensions
    {
        public static IRuleBuilder<T,string> Password<T>(this IRuleBuilder<T,string> ruleBuilder)
        {
             var options=ruleBuilder
             .NotEmpty()
             .MinimumLength(6).WithMessage("Password minumum have 6 characters")
             .Matches("[A-Z]").WithMessage("Password must contain uppercase letter")
             .Matches("[a-z]").WithMessage("Password must contain lowercase letter")
             .Matches("[0-9]").WithMessage("Password must contain number")
             .Matches("[^a-zA-Z0-9]").WithMessage("Passwprd must contain non alphanumeric letter");

             return options;

        }
    }
}