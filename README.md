# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


## `количество пользователей в списках`

Вы можете поменять количество отображаемых рандомных пользователей.\
Для этого вам необходимо ввести интересующее вас число в src/App.jsx \
в строке 22 вместо "4000" => `getUsers('4000', setUsers)`;

## `группы пользователей`

Пользователи в первой таблице делятся на категории, в зависимости от времени, \
прошедшего с их даты регистрации \
группы разбиты на десятки : "1-10" / "11-20" и.т.д .\
вы можете регулировать последнюю группу в src/components/AgeGroupsTable \
на 52 строке  => `const ageGroupsArray = getAgeGroups(50)` \
просто замените 50 на любое нужное вам число



