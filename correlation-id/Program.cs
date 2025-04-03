using Serilog;
using CorrelationId;
using Microsoft.OpenApi.Models;
using CorrelationId.DependencyInjection;

Log.Logger = new LoggerConfiguration()
    .Enrich.FromLogContext()
    .Enrich.WithCorrelationId()
    .WriteTo.Console(outputTemplate:
        "[{Timestamp:HH:mm:ss} {Level:u3}] [{CorrelationId}] {Message:lj}{NewLine}{Exception}")
    .CreateLogger();

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog();

// ✅ Add Swagger services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "My API",
        Version = "v1",
        Description = "API documentation with Swagger and Correlation ID"
    });

    // Optional: add correlation ID header to Swagger UI
    options.OperationFilter<AddCorrelationIdHeaderFilter>();
});

// ✅ Correlation ID
builder.Services.AddDefaultCorrelationId(options =>
{
    options.IncludeInResponse = true;
    options.UpdateTraceIdentifier = true;
    options.AddToLoggingScope = true;
});

var app = builder.Build();

// ✅ Swagger middleware
app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "My API v1");
});

app.UseCorrelationId();
app.UseSerilogRequestLogging();

app.MapGet("/", (HttpContext ctx) =>
{
    return Results.Ok(new
    {
        message = "Hello from .NET 8 + Serilog + Swagger",
        correlationId = ctx.TraceIdentifier
    });
});

app.Run();
