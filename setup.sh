sudo -t apt-get update && sudo apt-get install -y python-dev
sudo -t curl -O https://bootstrap.pypa.io/get-pip.py
sudo -t python get-pip.py
sudo -t pip install awscli --upgrade
aws --version
sudo -t aws s3 ls
