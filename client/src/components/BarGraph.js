import { CanvasJSChart } from 'canvasjs-react-charts';

export default function BarGraph() {

    const options = {
        title: {
            text: "Mail Analytics"
        },
        data: [
        {
            // Change type to "doughnut", "line", "splineArea", etc.
            type: "column",
            dataPoints: [
                { label: "Total Mails",  y: 20  },
                { label: "Opened", y: 15  },
                { label: "Clicked", y: 10  },                
            ]
        }
        ]
    }

    return <CanvasJSChart options={options} />
}