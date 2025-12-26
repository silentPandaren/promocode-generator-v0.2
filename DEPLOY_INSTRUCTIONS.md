# Инструкция: Загрузка на GitHub и деплой

## Шаг 1: Загрузка на GitHub через GitHub Desktop

1. Откройте **GitHub Desktop**
2. Нажмите **File** → **Add local repository** (или **Repository** → **Add** → **Add existing repository**)
3. В поле **"Local path"** нажмите **"Choose..."** и выберите папку: `C:\promocode-generator`
4. Если появится предупреждение **"This directory does not appear to be a Git repository"**, нажмите **"Create a repository"**
5. Внизу введите сообщение коммита: `Initial commit: Promocode generator`
6. Нажмите **"Commit to main"**
7. Нажмите **"Publish repository"** (кнопка вверху справа)
8. В открывшемся окне:
   - Выберите репозиторий: `silentPandaren/promocode-generator-v0.1` (или создайте новый)
   - Оставьте галочку **"Keep this code private"** если нужно
   - Нажмите **"Publish repository"**

✅ Готово! Код загружен на GitHub.

---

## Шаг 2: Деплой на Vercel (чтобы сайт работал в браузере)

### Вариант A: Через веб-интерфейс (самый простой)

1. Зайдите на **https://vercel.com**
2. Нажмите **"Sign Up"** и войдите через **GitHub** (используйте тот же аккаунт, где ваш репозиторий)
3. После входа нажмите **"Add New Project"**
4. Выберите ваш репозиторий **`promocode-generator-v0.1`**
5. Vercel автоматически определит Next.js и настроит всё
6. Нажмите **"Deploy"**
7. Подождите 1-2 минуты
8. ✅ Готово! Ваш сайт будет доступен по адресу типа: `https://promocode-generator-v0-1.vercel.app`

### Вариант B: Через командную строку

```bash
cd C:\promocode-generator
npm i -g vercel
vercel login
vercel
```

---

## Шаг 3: Автоматическое обновление

Теперь при каждом изменении кода:
1. Внесите изменения
2. В GitHub Desktop: введите сообщение коммита → **"Commit to main"** → **"Push origin"**
3. Vercel автоматически задеплоит новую версию!

---

## Альтернативные платформы (если Vercel не подходит)

### Netlify:
1. https://netlify.com → Sign up через GitHub
2. Add new site → Import from Git → выберите репозиторий
3. Deploy site

### Railway:
1. https://railway.app → Sign up через GitHub
2. New Project → Deploy from GitHub repo → выберите репозиторий

---

**Важно:** После деплоя ваш сайт будет доступен по постоянному URL, который можно использовать из любого браузера!

