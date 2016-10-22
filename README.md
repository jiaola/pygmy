To deploy on digitalocean

SSH to the server brickowls.com

```
cd /opt/brickowls/screech
git pull
webpack -p
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
      pinyin: 'ji',
      strokes: [
      ...
      ]
    }
  ]  
}
```
