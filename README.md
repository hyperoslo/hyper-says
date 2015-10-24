# Hyper Says

![Screenshot](https://raw.githubusercontent.com/hyperoslo/hyper-says/master/screenshot.jpg)

A simple application to commemorate all the weird things we say
[@hyperoslo][hyper].

## TV mode

Add [#tv][tv mode] to the URL to enable TV mode, which hides the links.

## Add a quote

1. Edit the [quote file][quote file]*!
2. ???
3. Profit!

\* If you don't have an account on GitHub, make one and ask someone for
   access to our organization.

## Development

Install the dependencies:

`$ npm install --save-dev`

Run the server:

`$ gulp serve`

Deploy the changes:

`$ divshot push && divshot promote staging production`

[hyper]: http://hyper.no
[quote file]: https://github.com/hyperoslo/hyper-says/edit/master/public/quotes.js
[tv mode]: http://hypersays.com/#TV
