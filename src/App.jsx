import React, { useState, useEffect } from 'react'
import stats121Picto from '../assets/lang.rank_.0121.wm_.png'
import './App.css'
import { languages } from './languages.js'

const containerSize = {width: 1050, height:825}

const getMyLanguages = () => {
    if (!localStorage) {
        return languages
    }
    const myLanguages = JSON.parse(localStorage.getItem('myLanguages'))
    return myLanguages
        ? Object.keys(languages).reduce((result, key) => {
            return { ...result,
                    [key]: {
                        ...languages[key],
                        selected: myLanguages[key] && myLanguages[key].selected
                        }
                    }
            }, {})
        : languages

}

const App = () => {
    const [dynamicLanguages, setDynamicLanguages] = useState(getMyLanguages())

    useEffect(() => {
        localStorage && localStorage.setItem('myLanguages', JSON.stringify(
            dynamicLanguages));
    }, [dynamicLanguages])

    const handleLanguageSelect = (language) => {
        setDynamicLanguages({
            ...dynamicLanguages,
            [language]: {
                ...dynamicLanguages[language],
                selected: !dynamicLanguages[language].selected
            }
        })
    }

    return (
        <div className="App">
        <header className="App-header">
            <p>See my own position on Redmonk Ranking</p>
            <a
                className="redMonkLink"
                target="redMonk"
                href="https://redmonk.com/sogrady/2021/03/01/language-rankings-1-21/"
            >(Source on RedMonk website)</a>
            <div className="redMonkContainer" >
                <img src={stats121Picto} className="redMonkSource" alt="RedMonkOriginal121" />
                <svg viewBox={`0 0 ${containerSize.width} ${containerSize.height}`} className="redMonkDynamic">
                    <Background />
                    { Object.keys(dynamicLanguages).map(key => (
                        <LanguageText
                            key={key}
                            language={dynamicLanguages[key]}
                            onSelect={() => handleLanguageSelect(key)}
                        />)
                    )}
                </svg>
            </div>

        </header>
        </div>
    )
}

const Background = () => {
    let verticalCoordinates = []
    for(let iV = 87; iV < containerSize.width; iV += 115){
        verticalCoordinates.push(iV);
    }

    let horizontalCoordinates = []
    for(let iH = 756; iH > 0; iH -= 87){
        horizontalCoordinates.push(iH);
    }

    return (
        <>
            <path
                d={"m 51 782 h 990 v -750 h -990 v 750"}
                strokeWidth="1.5"
                fill="lightgray"
                stroke="transparent"
            />
            { verticalCoordinates.map(x=>
                (<path
                    key={x}
                    d={`m ${x} 782 v -750`}
                    strokeWidth="1"
                    stroke="white"
                />))
            }
            { horizontalCoordinates.map(y=>
                (<path
                    key={y}
                    d={`m 51 ${y} h 990`}
                    strokeWidth="1"
                    stroke="white"
                />))
            }
            <path
                d={"m 51 782 l 990 -750"}
                strokeWidth="1.5"
                stroke="blue"
            />
        </>
    )
}

const LanguageText = ({language, onSelect}) => {
    return (
        <text onClick={onSelect} transform={`translate(${language.x} ${language.y})`}>
            <tspan className={`languageFont ${language.selected ? 'languageSelected' : ''}`}>{language.label}</tspan>
        </text>
    )
}

export default App
