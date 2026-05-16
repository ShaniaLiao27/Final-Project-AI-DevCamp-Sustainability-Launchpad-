from mcp.server.fastmcp import FastMCP

# Create a FastMCP server for Sustainability Metrics
mcp = FastMCP("Sustainability Metrics Database")

@mcp.tool()
def get_sustainability_framework(region: str) -> str:
    """Get the mandatory sustainability reporting framework for a specific region.
    
    Args:
        region: The region (e.g., 'EU', 'US', 'Global', 'UK', 'Taiwan')
    """
    frameworks = {
        "EU": "CSRD (Corporate Sustainability Reporting Directive) / ESRS",
        "US": "SEC Climate Disclosure Rules / California SB 253 & 261",
        "Global": "IFRS S1 & S2 (ISSB)",
        "UK": "TCFD / SDR",
        "Taiwan": "FSC Sustainable Development Action Plan / TCFD"
    }
    return frameworks.get(region, "GRI Standards (Global Reporting Initiative)")

@mcp.tool()
def calculate_carbon_footprint_estimate(employees: int, industry: str) -> str:
    """Provide a rough Scope 1+2 carbon footprint estimate for an SME based on size and industry.
    
    Args:
        employees: Number of employees
        industry: Industry category (e.g., 'Tech', 'Manufacturing', 'Retail', 'Food')
    """
    # Rough industry multiplier (tons CO2e per employee)
    multipliers = {
        "Tech": 2.5,
        "Manufacturing": 15.0,
        "Retail": 6.0,
        "Food": 8.5
    }
    
    base_factor = multipliers.get(industry, 5.0)
    total_estimate = employees * base_factor
    
    return f"Estimated Scope 1+2 Carbon Footprint for {employees} employees in {industry}: {total_estimate:,.1f} metric tons CO2e/year."

if __name__ == "__main__":
    # To run locally for testing:
    # python mcp_server.py
    mcp.run()
