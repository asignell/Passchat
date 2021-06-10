# PassChat

Passchat is a web based chat application with an infinite number of chat rooms!

## Deloying over Google Cloud

Create a Google App Engine instace. When creating the instance
make sure to choose the flexible option rather than standard, as that
is what enables App Engine to use webhooks.

Open up the Google Cloud command line and clone the repository into
your desired location. (Home directory by default)
```
git clone https://github.com/Jack-Rutland/Passchat.git
```

Next, enter the newly cloned directory.
```
cd Passchat
```

Now you ahve to install the dependancies through npm
```
npm install
```

Finally deploy the application to Google Cloud
```
gcloud app deploy
```
Accept any promts that pop up. This will take several minutes.

Once Google Cloud finishes deploying, PassChat should be live and fully functional!

## License
[MIT](https://choosealicense.com/licenses/mit/)