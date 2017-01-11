To test locally, make sure port 8080 is free, then run

```
npm start
```



To deploy on digitalocean

SSH to the server brickowls.com

```
cd /opt/brickowls/screech
git pull
npm run build:webpack
```

The settings will be shown on http://screech.brickowls.com

### State format
```
{
  options: {
    rows: 15,
    char_per_row: 3,
    grid: field,
    pinyin: true,
    strokes: true
  }
  characters: [
    {
      unicode: '3401',
      pinyin: ['ji'],
      strokes: [
      ...
      ]
    }
  ]  
}
```
