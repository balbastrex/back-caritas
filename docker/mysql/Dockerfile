FROM library/mysql:8.0

ARG USER_ID=1000
ARG GROUP_ID=1000

RUN usermod -u ${USER_ID:-1000} mysql \
  && groupmod -g ${GROUP_ID:-1000} mysql
