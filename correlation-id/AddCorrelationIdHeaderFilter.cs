using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

public class AddCorrelationIdHeaderFilter : IOperationFilter
{
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        operation.Parameters ??= new List<OpenApiParameter>();

        operation.Parameters.Add(new OpenApiParameter
        {
            Name = "X-Correlation-ID",
            In = ParameterLocation.Header,
            Required = false,
            Description = "Correlation ID for distributed tracing",
            Schema = new OpenApiSchema { Type = "string" }
        });
    }
}
