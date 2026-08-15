#!/bin/bash

# Find all SQL files and import them into local MySQL databases
# The database name will be the basename of the file without the .sql extension
# e.g., r4rinnew.sql will be imported into a database named r4rinnew

find . -name "*.sql" -print0 | while IFS= read -r -d '' file; do
    dbname=$(basename "$file" .sql)
    
    # Handle spaces or special characters if needed
    dbname=$(echo "$dbname" | tr -d ' ')
    
    echo "Processing $file -> Database: $dbname"
    
    # Create the database if it doesn't exist
    mysql -u root -e "CREATE DATABASE IF NOT EXISTS \`$dbname\`;"
    
    # Import the SQL file
    # We suppress output but will stop if a fatal error occurs
    mysql -u root "$dbname" < "$file"
    
    if [ $? -eq 0 ]; then
        echo "Successfully imported $dbname"
    else
        echo "Warning: Error occurred during import of $dbname"
    fi
done

echo "All SQL files have been processed."
