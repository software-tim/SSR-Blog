#!/bin/bash

# Search Server Startup Script
# This script starts the search server for the SSR-Blog application

# In your SSH session, create the script
#  cat > search-server.sh << 'EOF'
# [paste the script content from above]
#  EOF
# Start the search server
# ./search-server.sh start

# Check if it's running
# ./search-server.sh status

# Stop the server
# ./search-server.sh stop

# Restart the server
# ./search-server.sh restart

# View logs
# ./search-server.sh logs

# Follow logs in real-time
# ./search-server.sh logs -f

# Test the search API
# ./search-server.sh test

# Test with a custom query
# ./search-server.sh test "javascript"

# Show help
# ./search-server.sh help

# Make it executable
# chmod +x search-server.sh

# Configuration
SCRIPT_DIR="/home/site/wwwroot"
SEARCH_SERVER="src/lib/search-server.js"
LOG_FILE="search.log"
PID_FILE="search-server.pid"
PORT=8081

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} ✅ $1"
}

print_error() {
    echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} ❌ $1"
}

print_warning() {
    echo -e "${YELLOW}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} ⚠️  $1"
}

# Function to check if search server is running
is_running() {
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        if ps -p "$PID" > /dev/null 2>&1; then
            return 0
        else
            rm -f "$PID_FILE"
            return 1
        fi
    fi
    return 1
}

# Function to start the search server
start_server() {
    print_status "Starting search server..."
    
    # Change to the correct directory
    cd "$SCRIPT_DIR" || {
        print_error "Failed to change to directory: $SCRIPT_DIR"
        exit 1
    }
    
    # Check if the search server file exists
    if [ ! -f "$SEARCH_SERVER" ]; then
        print_error "Search server file not found: $SEARCH_SERVER"
        exit 1
    fi
    
    # Check if already running
    if is_running; then
        PID=$(cat "$PID_FILE")
        print_warning "Search server is already running (PID: $PID)"
        return 0
    fi
    
    # Start the server
    nohup node "$SEARCH_SERVER" > "$LOG_FILE" 2>&1 &
    SERVER_PID=$!
    
    # Save PID
    echo "$SERVER_PID" > "$PID_FILE"
    
    # Wait a moment and check if it started successfully
    sleep 2
    
    if is_running; then
        print_success "Search server started successfully (PID: $SERVER_PID)"
        print_status "Server running on port $PORT"
        print_status "Log file: $LOG_FILE"
        
        # Test the health endpoint
        print_status "Testing server health..."
        if curl -s "http://localhost:$PORT/api/health" > /dev/null; then
            print_success "Health check passed ✓"
        else
            print_warning "Health check failed - server may still be starting up"
        fi
    else
        print_error "Failed to start search server"
        if [ -f "$LOG_FILE" ]; then
            print_error "Check log file for details: $LOG_FILE"
            echo "Last few lines of log:"
            tail -5 "$LOG_FILE"
        fi
        exit 1
    fi
}

# Function to stop the search server
stop_server() {
    print_status "Stopping search server..."
    
    if is_running; then
        PID=$(cat "$PID_FILE")
        kill "$PID" 2>/dev/null
        
        # Wait for graceful shutdown
        sleep 2
        
        # Force kill if still running
        if ps -p "$PID" > /dev/null 2>&1; then
            print_warning "Force killing server..."
            kill -9 "$PID" 2>/dev/null
        fi
        
        rm -f "$PID_FILE"
        print_success "Search server stopped"
    else
        print_warning "Search server is not running"
    fi
}

# Function to restart the search server
restart_server() {
    print_status "Restarting search server..."
    stop_server
    sleep 1
    start_server
}

# Function to show server status
show_status() {
    if is_running; then
        PID=$(cat "$PID_FILE")
        print_success "Search server is running (PID: $PID)"
        
        # Show process info
        ps -p "$PID" -o pid,ppid,cpu,mem,etime,cmd --no-headers
        
        # Test health endpoint
        print_status "Testing health endpoint..."
        HEALTH_RESPONSE=$(curl -s "http://localhost:$PORT/api/health" 2>/dev/null)
        if [ $? -eq 0 ]; then
            print_success "Health check: $HEALTH_RESPONSE"
        else
            print_error "Health check failed"
        fi
        
        # Show recent logs
        if [ -f "$LOG_FILE" ]; then
            echo ""
            print_status "Recent log entries:"
            tail -10 "$LOG_FILE"
        fi
    else
        print_error "Search server is not running"
    fi
}

# Function to show logs
show_logs() {
    if [ -f "$LOG_FILE" ]; then
        print_status "Showing search server logs..."
        if [ "$1" = "follow" ] || [ "$1" = "-f" ]; then
            tail -f "$LOG_FILE"
        else
            cat "$LOG_FILE"
        fi
    else
        print_error "Log file not found: $LOG_FILE"
    fi
}

# Function to test the search API
test_search() {
    local query="${1:-test}"
    print_status "Testing search API with query: '$query'"
    
    if ! is_running; then
        print_error "Search server is not running"
        exit 1
    fi
    
    print_status "Making search request..."
    SEARCH_RESPONSE=$(curl -s "http://localhost:$PORT/api/search?q=$query" 2>/dev/null)
    
    if [ $? -eq 0 ]; then
        print_success "Search API response:"
        echo "$SEARCH_RESPONSE" | head -c 500
        if [ ${#SEARCH_RESPONSE} -gt 500 ]; then
            echo "... (truncated)"
        fi
    else
        print_error "Search API test failed"
        exit 1
    fi
}

# Function to show help
show_help() {
    echo "Search Server Management Script"
    echo ""
    echo "Usage: $0 {start|stop|restart|status|logs|test|help}"
    echo ""
    echo "Commands:"
    echo "  start     - Start the search server"
    echo "  stop      - Stop the search server"
    echo "  restart   - Restart the search server"
    echo "  status    - Show server status and health"
    echo "  logs      - Show server logs"
    echo "  logs -f   - Follow server logs in real-time"
    echo "  test      - Test search API with default query"
    echo "  test <q>  - Test search API with custom query"
    echo "  help      - Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 start              # Start the server"
    echo "  $0 status             # Check if running"
    echo "  $0 test \"javascript\"   # Test search with custom query"
    echo "  $0 logs -f            # Follow logs in real-time"
}

# Main script logic
case "$1" in
    start)
        start_server
        ;;
    stop)
        stop_server
        ;;
    restart)
        restart_server
        ;;
    status)
        show_status
        ;;
    logs)
        show_logs "$2"
        ;;
    test)
        test_search "$2"
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        echo ""
        show_help
        exit 1
        ;;
esac