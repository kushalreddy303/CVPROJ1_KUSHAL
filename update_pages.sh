#!/bin/bash

# Array of pages with their audio files
declare -A pages
pages["fall-detection.html"]="Fall Detection.mp3"
pages["challenges.html"]="Challenges.mp3"
pages["datasets.html"]="Datasets.mp3"
pages["bibliography.html"]="bibliography.mp3"
pages["quiz.html"]="Quiz.mp3"

for page in "${!pages[@]}"; do
    echo "Processing $page..."
done
