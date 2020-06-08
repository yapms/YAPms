#!/bin/bash

trap "echo helppp" 2

cmd1='ls ./app/src/*.js | grep -v ./app/src/YAPms.js | entr -s "cat '
for ELEMENT in 'Account.js' 'Candidate.js' 'ChartManager.js' 'CookieManager.js' 'InputManager.js' 'KeyboardManager.js' 'LegendManager.js' 'LogoManager.js' 'MapManager.js' 'MapLoader.js' 'PresetLoader.js' 'State.js' 'battlechart.js' 'click.js' 'congress.js' 'data.js' 'htmlControl.js' 'menuControl.js' 'PopularVote.js' 'savemap.js' 'main.js'; 
do
	cmd1+="./app/src/${ELEMENT} "
done
cmd1+='> ./app/src/YAPMS.js"'

cmd2='ls ./app/style/*.css | grep -v ./app/style/YAPms.css | entr -s "cat '
for ELEMENT in 'mysaves.css' 'input.css' 'menu.css' 'selectmenu.css' 'popup.css' 'legend.css' 'style.css' 'battlechart.css' 'yapnews.css' 'sidebar.css'; 
do
	cmd2+="./app/style/${ELEMENT} "
done
cmd2+='> ./app/style/YAPMS.css"'

eval $cmd1 & 
eval $cmd2 &
