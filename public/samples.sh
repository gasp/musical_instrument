#!/bin/sh


curl -k -L \
https://github.com/tidalcycles/Dirt-Samples/archive/master.zip \
-o samples.zip && unzip samples.zip && rm samples.zip && mv Dirt-Samples-master samples;
