import Layout from '../components/Layout';

function createData(id, date, schedule, recipient, subject ) {
  return { id, date, schedule, recipient, subject };
}

const rows = [
  createData(0, '16 Mar, 2019', '20 Mar, 2019, 10:40 am', 'Mitra Choda', 'Mitra being Mitra with his chutiyap'),
  createData(1, '16 Mar, 2019', '20 Mar, 2019, 10:40 am', 'Mitra Choda', 'Chutiyap'),
  createData(2, '16 Mar, 2019', '20 Mar, 2019, 10:40 am', 'Mitra Choda', 'Chutiyap'),
  createData(3, '16 Mar, 2019', '20 Mar, 2019, 10:40 am', 'Mitra Choda', 'Chutiyap'),
  createData(4, '16 Mar, 2019', '20 Mar, 2019, 10:40 am', 'Mitra Choda', 'Chutiyap'),
];

const chart = {
  enable: true,
}

const block = {
  enable:true,
  details:null,
}

const list = {
  enable: true,
  items: rows,
}

function Dashboard () {
    return <Layout chart={chart} block={block} list={list} title={"Dashboard"} />
}

export default Dashboard;