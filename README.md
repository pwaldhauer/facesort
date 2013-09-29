# facesort

This is a short script using the [NodeJS OpenCV bindings](https://github.com/peterbraden/node-opencv) to detect faces on images and sort them accordingly.

It's not perfect and you may have to experiment with the different cascade files provided by OpenCV.

## Installation

Install via npm: `sudo npm install -g facesort` OR clone repo, do a `npm install` and `npm link`

(`node-opencv` needs OpenCV -- on MacOS this works perfectly using Homebrew: `brew tap homebrew/science && brew install opencv`)

## Usage

````
Sorts images with faces. Usage: facesort -i [path]

Options:
  -i, --in        Path of the directory containing the files          [default: "."]
  -f, --face      Path images containing faces should be moved to     [default: "./face"]
  -n, --noface    Path images containing NO faces should be moved to  [default: "./noface"]
  -p, --parallel  Maximum number concurrent face detections           [default: 10]
  -c, --cascade   Cascade file to use                                 [default: "haarcascade_frontalface_default"]
  -l, --list      Prints a list of available cascade files
  -h, --help      Shows this help
````


## Why?

Every hour my webcam snaps a picture. Sometimes I'm not at my desk, so there are quite a few pictures without me, that sucks! Sorting them manually sucks, too. AUTOMATE EVERYTHING.

## License

MIT
