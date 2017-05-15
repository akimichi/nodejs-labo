require 'rake'
require 'fileutils'
require 'rake/clean'


task :default => :test

task :test do
  command = "docker run -it --rm -v $PWD:/usr/src/app registry.homeunix.net:5000/emile/nodejs-labo-6.10:0.7"
  sh command
end

# prepare => package.json
# ~~~
# docker build -t nodejs-labo-onbuild:6.10 - < Dockerfile.onbuild
# docker tag nodejs-labo-onbuild:6.10 registry.homeunix.net:5000/emile/nodejs-labo-6.10_onbuild:0.1
# docker push registry.homeunix.net:5000/emile/nodejs-labo-6.10_onbuild:0.1
# ~~~

# build => Dockerfile.onbuild
# ~~~
# docker build -t nodejs-labo:6.10 .
# ~~~

# run
# ~~~
# docker run -it --rm -v $PWD:/usr/src/app nodejs-labo:6.10 
# ~~~
