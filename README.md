# octodocs

Агрегатор OpenAPI документации для микросервисов.

## Installation

```
  npm install -g octodocs
```

or

```
  yarn global add octodocs
```

## Usage

```

  Usage: octodocs --config <config.json>

      <config.json> — path to your config.json file
      --port        — specify port, default 3000
      --help, --h   — show this message

```

  $ octodocs --config config.json

```

## Config.json

| поле        | тип                                  | обязательность        | описание                                                                                                                                                         |
|-------------|--------------------------------------|-----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `url`       | `string`                             | да                    | стартовый урл для опроса сервисов: `${url}/${serviceID}/openapi`                                                                                                 |
| `discovery` | `"map" \| "k8s" \| "http"`           | да                    | тип поиска списка сервисов                                                                                                                                       |
| `services`  | `map<string, string \| null>`        | для discovery: "map"  | работа с заданным списком сервисов, значение параметра объект вида: ``` {  "serviceID1": "Service Name",  "serviceID2": null } ```                               |
| `k8s`       | `см. k8s`                            | для discovery: "k8s"  | обнаружение списка сервисов через k8s                                                                                                                            |
| `service`   | `string`                             | для discovery: "http" | загрузка списка сервисов из другого сервиса, значения параметра это урл, ожидаемый ответ от сервиса это json: ```{ services: { id: string, name: string }[] }``` |
