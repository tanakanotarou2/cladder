

## これはなに
業務ウェブアプリを作る練習(Django, Next.js の練習)
Djangoのチュートリアルpoll appをウェブアプリにするプロジェクトです。

https://dj-nextjs-poll-app.vercel.app

## frontend

### 使ったライブラリなど

* Next.js
* Material-UI
* axios, aspida
* openapi2aspida
* React Hook Form
* Jotai

openapi2aspidaは、backendで出力されるエンドポイントのスキーマから型定義を出力するために使用しています。

## backend

ビジネスロジックを分離する MVC+Service を意識して作成しています。

### 使ったライブラリなど

* Django 3.2
* Django REST framework
* drf-spectacular
* dependency-injector

drf-spectacularはエンドポイントのスキーマを出力するために使用しました。
また、dependency-injectorを使ってDIをできるようにしています。
