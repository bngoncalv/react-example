sudo -S apt-get update && sudo apt-get install -y python-dev
sudo -S curl -O https://bootstrap.pypa.io/get-pip.py
sudo -S python get-pip.py
sudo -S pip install awscli --upgrade
aws --version
sudo -S aws s3 ls
