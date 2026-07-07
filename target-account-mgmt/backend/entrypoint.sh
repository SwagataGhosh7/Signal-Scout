#!/bin/bash
# Initialize database when container starts
npm run migrate 2>&1 || true
npm run dev
