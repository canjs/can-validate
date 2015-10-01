#!/bin/bash
# Script pulled from: https://gist.github.com/domenic/ec8b0fc8ab45f39403dd

DEST=~/can-validate-gh-pages
TARGET=./public/

set -e # exit with nonzero exit code if anything fails

# clear and re-create the dest directory
rm -rf $DEST || exit 0;
mkdir $DEST;

# run our compile script, discussed above
node buildDocsSite.js

# copy content to gh-pages
cp -rf $TARGET $DEST

# go to the out directory and create a *new* Git repo
cd $DEST
git init

# inside this git repo we'll pretend to be a new user
git config user.name "Travis CI"
git config user.email "juan@bitovi.com"

# The first and only commit to this new Git repo contains all the
# files present with the commit message "Deploy to GitHub Pages".
git add .
git commit -m "Deploy to GitHub Pages"

# Force push from the current repo's master branch to the remote
# repo's gh-pages branch. (All previous history on the gh-pages branch
# will be lost, since we are overwriting it.) We redirect any output to
# /dev/null to hide any sensitive credential data that might otherwise be exposed.
#git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
git push --force --quiet "https://github.com/canjs/can-validate.git" master:gh-pages > /dev/null 2>&1
# remove folder
#rm -rf $DEST
