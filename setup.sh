apt-get update && apt-get install -y python-dev
curl -O https://bootstrap.pypa.io/get-pip.py
python get-pip.py
pip install awscli --upgrade
aws --version
aws s3 ls
