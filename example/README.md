For development, everytime you run `npm start`, a file named form.entry.js will be generated based on the latest code. 

To rebuild the example for production form.entry.js, use the following command. 

```
webpack -p
```

It will generate a dist directory with three files. Copy these files to the gh-pages branch and remove the dist folder. 

