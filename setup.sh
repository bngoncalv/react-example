sudo apt-get update && sudo apt-get install -y python-dev
sudo curl -O https://bootstrap.pypa.io/get-pip.py
sudo python get-pip.py
sudo pip install awscli --upgrade
aws --version
sudo aws s3 ls
