FROM webdevops/php-apache-dev:8.3@sha256:db0b1a08cf0c7a1b2aeed4b6dda9980a7808f7b083407e6edc78fb094a2efab0

#ARG REPOSITORY_HOST

RUN apt-get update -y && \
    apt-get install git -y && \
    apt-get install openssh-client -y && \
    apt-get install python3 -y && \
    apt-get install python3-pip -y

WORKDIR /home/application/.ssh

COPY docker/webserver/openssl/openssl.cnf /etc/ssl/
