template_dir=$1
project_dir=$2

new_template_name=$(basename "$project_dir")
mkdir -p "template-content" _tmp

# Create instructions for the user
echo "Ready to use" >> template-content/instructions.md


echo "echo 'Installing: $new_template_name'" > "template-content/prehook.sh"
echo "echo 'Installed: $new_template_name'" > "template-content/posthook.sh"
touch "template-content/modules.txt"
touch "template-content/values.txt"

chmod +x "template-content/prehook.sh"
chmod +x "template-content/posthook.sh"

