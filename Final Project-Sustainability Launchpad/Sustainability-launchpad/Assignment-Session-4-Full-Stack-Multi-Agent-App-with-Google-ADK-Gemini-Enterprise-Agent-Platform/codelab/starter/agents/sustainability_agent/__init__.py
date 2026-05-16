"""Sustainability Launchpad — global multi-agent platform."""
from .master_router import sustainability_master

# ADK convention: root_agent is the entry point for `adk web`
root_agent = sustainability_master
