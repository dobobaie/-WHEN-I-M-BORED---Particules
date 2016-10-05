# WHEN I'M BORDER - Particules

## Configuration possible

```
	{
		fall: 'bottom',
		console: false,
		sequenceMove: 8,
		sequenceAdd: 500,
		trace: false,
		totalParticule: 100,
		maxParticulePerFrame: 2,
		className: ['particule'],
		classSizeName: ['xs', 'xm', 'xl'],
		classLightName: ['light', 'medium', 'strong'],
		timeBeforeKill: 30000,
		trajectory: {
			time: 1000,
			maxY: ($(document).height() / 100) * 25,
			minY: ($(document).height() / 100) * 15,
			maxX: ($(document).width() / 100) * 10,
			minX: ($(document).width() / 100) * 2,
			degrees: 35,
		}
	}
```
