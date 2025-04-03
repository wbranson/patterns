using Serilog;
using CorrelationId;

Log.Logger = new LoggerConfiguration()
    .Enrich.FromLogContext()
    .Enrich.WithCorrelationId()
    .WriteTo.Console(outputTemplate:
        "[{Timestamp:HH:mm:ss} {Level:u3}] [{CorrelationId}] {Message:lj}{NewLine}{Exception}")
    .CreateLogger();

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog();

// Add correlation ID service
builder.Services.AddCorrelationId(options =>
{
    options.Header = "X-Correlation-ID";
    options.IncludeInResponse = true;
    options.UpdateTraceIdentifier = true;
    options.UseGuidForCorrelationId = true;
});

var app = builder.Build();

// Add correlation ID middleware
app.UseCorrelationId();
app.UseSerilogRequestLogging();

app.MapGet("/", (HttpContext context) =>
{
    var correlationId = context.GetCorrelationId(); // from CorrelationId package
    return Results.Ok(new { message = "Hello!", correlationId });
});

app.Run();
