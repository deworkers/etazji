Для работы сборщика нужен установленный на компьютер node js/

Для начала работы нужно установить npm и bower компоненты. Для этого ввести в командную строку с корне проекта:
npm install
bower install

Команды:

gulp - запускает основной задачи на сборку проекта, сервер и отслеживение изменения файлов в директории /src/
    включает в себя:
    gulp build - сборка проекта
    gulp webserver - запуск сервера на основе файлов в директории /build/
    gulp watch - задача на отслеживение изменения файлов в директории /src/

gulp clean - чистка папка build

gulp sprite - сборка спрайтов (можно запускать параллельно работе основной задачи)

