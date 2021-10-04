namespace Manifest
{	
	const channels = [
		"CLOSE",
		"DECCA",
		"SURROUND",
		"WIDE"
	];

	const samplers = [
		{
			"id": "Sampler0",
			"properties": {"VoiceAmount": 256, "VoiceLimit": 128, "Gain": 0}
		},
		{
			"id": "Sampler1",
			"properties": {"VoiceAmount": 64, "VoiceLimit": 32, "Gain": 0}
		},
		{
			"id": "Sampler2",
			"properties": {"VoiceAmount": 256, "VoiceLimit": 128, "Gain": 0}
		},
		{
			"id": "Sampler3",
			"properties": {"VoiceAmount": 64, "VoiceLimit": 32}
		}
	];

	const scripts = [
		{
			"id": "sampler0Legato",
			"properties": {
				"XfadeTm": 70,
				"BendMinUp": 20,
				"BendMinDn": 20,
				"BendOctUp": 60,
				"BendOctDn": 60
			}
		}
	];

	const labels = {
		"pnlDynamics": [
			{
				"text": "EXPRESSION",
				"area": [0, 20, 141.5, 22]
			},
			{
				"text":"DXF",
				"area": [141.5, 20, 141.5, 22]
			}
		],
		"pnlRelease": [
			{
				"text": "VOLUME",
				"area": [0, 20, 283, 22]
			}
		],
		"pnlVibrato": [
			{
				"text": "RATE",
				"area": [0, 20, 141.5, 22]
			},
			{
				"text": "DEPTH",
				"area": [141.5, 20, 141.5, 22]
			}
		],
		"pnlEffects": [
			{
				"text": "GROWL",
				"area": [0, 20, 141.5, 22]
			},
			{
				"text": "FLUTTER",
				"area": [141.5, 20, 141.5, 22]
			}
		],
		"pnlEnvelope": [
			{
              "text": "CURVE",
              "area": [0, 133, 70, 18]
            },
            {
              "text": "A",
              "area": [70, 133, 30, 18]
            },
            {
              "text": "H",
              "area": [111, 133, 30, 18]
            },
            {
              "text": "D",
              "area": [153, 133, 30, 18]
            },
            {
              "text": "S",
              "area": [194, 133, 30, 18]
            },
            {
              "text": "R",
              "area": [236, 133, 30, 18]
            }
          ]
	};
	
	const articulations = [
		{
			"id": "Live",
      		"program": 0,
      		"samplers": [0, 1, 3],
      		"ahdsr": false,
      		"modulators": [
	      		{
		      		"id": "sampler0GainAHDSR",
					"properties": {"Bypass": true}
	      		},
	    		{
		      		"id": "sampler0GainTable",
					"properties": {"Bypass": false}
	      		},
	    		{
		      		"id": "sampler0SampleStartVelocity",
		      		"properties": {"Bypass": false}
	      		},
	    		{
		      		"id": "sampler0SampleStartRandom",
					"properties": {"Bypass": false}
	      		}
      		],
			"scripts": [
				{
					"id": "sampler0Legato",
					"properties": {"Mute": false}
				}
			]
    	},
	    {
			"id": "Sustain",
			"program": 1,
			"samplers": [0, 3],
			"ahdsr": "sampler0GainAHDSR",
   			"modulators": [
	      		{
		      		"id": "sampler0GainAHDSR",
					"properties": {"Bypass": false}
	      		},
	    		{
		      		"id": "sampler0GainTable",
					"properties": {"Bypass": true}
	      		},
	    		{
		      		"id": "sampler0SampleStartVelocity",
		      		"properties": {"Bypass": true}
	      		},
	    		{
		      		"id": "sampler0SampleStartRandom",
					"properties": {"Bypass": true}
	      		}
      		],
			"scripts": [
				{
					"id": "sampler0Legato",
					"properties": {"Mute": true}
				}
			]
		},
		{
	      	"id": "Staccato",
	      	"program": 2,
	      	"samplers": [2],
	      	"ahdsr": "sampler2GainAHDSR",
	      	"scripts":[
				{
					"id": "sampler2RoundRobin",
					"properties": {
						"FirstGroup": 1,
						"Count": 3
					}
				}
			],
	      	"disabledComponents": ["knbVibratoRate", "knbVibratoDepth", "knbReleaseGain", "knbGrowl", "knbFlutter"]
		},
		{
			"id": "Sputato",
	      	"program": 3,
	      	"samplers": [2],
	      	"ahdsr": "sampler2GainAHDSR",
	      	"scripts":[
				{
					"id": "sampler2RoundRobin",
					"properties": {
						"FirstGroup": 4,
						"Count": 2
					}
				}
			],
	      	"disabledComponents": ["knbVibratoRate", "knbVibratoDepth", "knbReleaseGain", "knbGrowl", "knbFlutter"]
		}
	];
	
	const patches = [{
		"id": "AltoFlute",
		"keyRanges": [
        	[55, 91, "0x4452413d", 0.0],
        	[24, 27, "0x22ff0000", 0.2]
      	],
      	"firstKs": 24,
      	"articulations": {
	      	"active": [0, 1, 2, 3],
	      	"keyRanges": [[], [], [[55, 85, "0x4452413d", 0.0]], []]
      	},
      	"samplers": [
			{
				"id": "Sampler0",
				"SampleMap": "altoFluteSustain"
			},
			{
				"id": "Sampler1",
				"SampleMap": "altoFluteTransition",
				"properties": {"Gain": -10}
			},
			{
				"id": "Sampler2",
				"SampleMap": "altoFluteStaccato"
			},
			{
				"id": "Sampler3",
				"SampleMap": "altoFluteRelease"
			}
      	],
      	"scripts": [
      		{
				"id": "legatoAttackTimeHandler",
				"properties": {"Max": 750}
			}
      	]
	}];
}