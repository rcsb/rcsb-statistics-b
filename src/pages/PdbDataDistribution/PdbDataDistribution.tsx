import React from 'react';
import BasicChart from '../../components/BasicChart/BasicChart';

const DataDistribution: React.FC = () => {
  const rawData = [
    [
        {
            "label": "1976",
            "population": 13,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "1976",
                    "X-ray",
                    13
                ]
            }
        },
        {
            "label": "1977",
            "population": 23,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "1977",
                    "X-ray",
                    23
                ]
            }
        },
        {
            "label": "1978",
            "population": 6,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "1978",
                    "X-ray",
                    6
                ]
            }
        },
        {
            "label": "1979",
            "population": 11,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "1979",
                    "X-ray",
                    11
                ]
            }
        },
        {
            "label": "1980",
            "population": 16,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "1980",
                    "X-ray",
                    16
                ]
            }
        },
        {
            "label": "1981",
            "population": 16,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "1981",
                    "X-ray",
                    16
                ]
            }
        },
        {
            "label": "1982",
            "population": 32,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "1982",
                    "X-ray",
                    32
                ]
            }
        },
        {
            "label": "1983",
            "population": 36,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "1983",
                    "X-ray",
                    36
                ]
            }
        },
        {
            "label": "1984",
            "population": 21,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "1984",
                    "X-ray",
                    21
                ]
            }
        },
        {
            "label": "1985",
            "population": 19,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "1985",
                    "X-ray",
                    19
                ]
            }
        },
        {
            "label": "1986",
            "population": 17,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "1986",
                    "X-ray",
                    17
                ]
            }
        },
        {
            "label": "1987",
            "population": 25,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "1987",
                    "X-ray",
                    25
                ]
            }
        },
        {
            "label": "1988",
            "population": 52,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "1988",
                    "X-ray",
                    52
                ]
            }
        },
        {
            "label": "1989",
            "population": 71,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "1989",
                    "X-ray",
                    71
                ]
            }
        },
        {
            "label": "1990",
            "population": 135,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "1990",
                    "X-ray",
                    135
                ]
            }
        },
        {
            "label": "1991",
            "population": 162,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "1991",
                    "X-ray",
                    162
                ]
            }
        },
        {
            "label": "1992",
            "population": 181,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "1992",
                    "X-ray",
                    181
                ]
            }
        },
        {
            "label": "1993",
            "population": 622,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "1993",
                    "X-ray",
                    622
                ]
            }
        },
        {
            "label": "1994",
            "population": 1067,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "1994",
                    "X-ray",
                    1067
                ]
            }
        },
        {
            "label": "1995",
            "population": 750,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "1995",
                    "X-ray",
                    750
                ]
            }
        },
        {
            "label": "1996",
            "population": 983,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "1996",
                    "X-ray",
                    983
                ]
            }
        },
        {
            "label": "1997",
            "population": 1234,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "1997",
                    "X-ray",
                    1234
                ]
            }
        },
        {
            "label": "1998",
            "population": 1722,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "1998",
                    "X-ray",
                    1722
                ]
            }
        },
        {
            "label": "1999",
            "population": 1960,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "1999",
                    "X-ray",
                    1960
                ]
            }
        },
        {
            "label": "2000",
            "population": 2236,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "2000",
                    "X-ray",
                    2236
                ]
            }
        },
        {
            "label": "2001",
            "population": 2383,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "2001",
                    "X-ray",
                    2383
                ]
            }
        },
        {
            "label": "2002",
            "population": 2525,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "2002",
                    "X-ray",
                    2525
                ]
            }
        },
        {
            "label": "2003",
            "population": 3586,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "2003",
                    "X-ray",
                    3586
                ]
            }
        },
        {
            "label": "2004",
            "population": 4399,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "2004",
                    "X-ray",
                    4399
                ]
            }
        },
        {
            "label": "2005",
            "population": 4428,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "2005",
                    "X-ray",
                    4428
                ]
            }
        },
        {
            "label": "2006",
            "population": 5509,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "2006",
                    "X-ray",
                    5509
                ]
            }
        },
        {
            "label": "2007",
            "population": 6139,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "2007",
                    "X-ray",
                    6139
                ]
            }
        },
        {
            "label": "2008",
            "population": 6197,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "2008",
                    "X-ray",
                    6197
                ]
            }
        },
        {
            "label": "2009",
            "population": 6663,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "2009",
                    "X-ray",
                    6663
                ]
            }
        },
        {
            "label": "2010",
            "population": 7156,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "2010",
                    "X-ray",
                    7156
                ]
            }
        },
        {
            "label": "2011",
            "population": 7340,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "2011",
                    "X-ray",
                    7340
                ]
            }
        },
        {
            "label": "2012",
            "population": 8141,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "2012",
                    "X-ray",
                    8141
                ]
            }
        },
        {
            "label": "2013",
            "population": 8704,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "2013",
                    "X-ray",
                    8704
                ]
            }
        },
        {
            "label": "2014",
            "population": 8800,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "2014",
                    "X-ray",
                    8800
                ]
            }
        },
        {
            "label": "2015",
            "population": 8578,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "2015",
                    "X-ray",
                    8578
                ]
            }
        },
        {
            "label": "2016",
            "population": 9925,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "2016",
                    "X-ray",
                    9925
                ]
            }
        },
        {
            "label": "2017",
            "population": 10071,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "2017",
                    "X-ray",
                    10071
                ]
            }
        },
        {
            "label": "2018",
            "population": 9853,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "2018",
                    "X-ray",
                    9853
                ]
            }
        },
        {
            "label": "2019",
            "population": 9620,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "2019",
                    "X-ray",
                    9620
                ]
            }
        },
        {
            "label": "2020",
            "population": 11196,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "2020",
                    "X-ray",
                    11196
                ]
            }
        },
        {
            "label": "2021",
            "population": 9241,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "2021",
                    "X-ray",
                    9241
                ]
            }
        },
        {
            "label": "2022",
            "population": 9827,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "2022",
                    "X-ray",
                    9827
                ]
            }
        },
        {
            "label": "2023",
            "population": 9601,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "2023",
                    "X-ray",
                    9601
                ]
            }
        },
        {
            "label": "2024",
            "population": 5983,
            "objectConfig": {
                "color": "#86b5e6",
                "objectId": [
                    "2024",
                    "X-ray",
                    5983
                ]
            }
        }
    ],
    [
        {
            "label": "1984",
            "population": 1,
            "objectConfig": {
                "color": "#2fad30",
                "objectId": [
                    "1984",
                    "Multiple methods",
                    1
                ]
            }
        },
        {
            "label": "1985",
            "population": 1,
            "objectConfig": {
                "color": "#2fad30",
                "objectId": [
                    "1985",
                    "Multiple methods",
                    1
                ]
            }
        },
        {
            "label": "1986",
            "population": 1,
            "objectConfig": {
                "color": "#2fad30",
                "objectId": [
                    "1986",
                    "Multiple methods",
                    1
                ]
            }
        },
        {
            "label": "1989",
            "population": 1,
            "objectConfig": {
                "color": "#2fad30",
                "objectId": [
                    "1989",
                    "Multiple methods",
                    1
                ]
            }
        },
        {
            "label": "1996",
            "population": 1,
            "objectConfig": {
                "color": "#2fad30",
                "objectId": [
                    "1996",
                    "Multiple methods",
                    1
                ]
            }
        },
        {
            "label": "1999",
            "population": 1,
            "objectConfig": {
                "color": "#2fad30",
                "objectId": [
                    "1999",
                    "Multiple methods",
                    1
                ]
            }
        },
        {
            "label": "2000",
            "population": 1,
            "objectConfig": {
                "color": "#2fad30",
                "objectId": [
                    "2000",
                    "Multiple methods",
                    1
                ]
            }
        },
        {
            "label": "2003",
            "population": 2,
            "objectConfig": {
                "color": "#2fad30",
                "objectId": [
                    "2003",
                    "Multiple methods",
                    2
                ]
            }
        },
        {
            "label": "2004",
            "population": 2,
            "objectConfig": {
                "color": "#2fad30",
                "objectId": [
                    "2004",
                    "Multiple methods",
                    2
                ]
            }
        },
        {
            "label": "2006",
            "population": 2,
            "objectConfig": {
                "color": "#2fad30",
                "objectId": [
                    "2006",
                    "Multiple methods",
                    2
                ]
            }
        },
        {
            "label": "2007",
            "population": 3,
            "objectConfig": {
                "color": "#2fad30",
                "objectId": [
                    "2007",
                    "Multiple methods",
                    3
                ]
            }
        },
        {
            "label": "2008",
            "population": 2,
            "objectConfig": {
                "color": "#2fad30",
                "objectId": [
                    "2008",
                    "Multiple methods",
                    2
                ]
            }
        },
        {
            "label": "2009",
            "population": 6,
            "objectConfig": {
                "color": "#2fad30",
                "objectId": [
                    "2009",
                    "Multiple methods",
                    6
                ]
            }
        },
        {
            "label": "2010",
            "population": 12,
            "objectConfig": {
                "color": "#2fad30",
                "objectId": [
                    "2010",
                    "Multiple methods",
                    12
                ]
            }
        },
        {
            "label": "2011",
            "population": 13,
            "objectConfig": {
                "color": "#2fad30",
                "objectId": [
                    "2011",
                    "Multiple methods",
                    13
                ]
            }
        },
        {
            "label": "2012",
            "population": 3,
            "objectConfig": {
                "color": "#2fad30",
                "objectId": [
                    "2012",
                    "Multiple methods",
                    3
                ]
            }
        },
        {
            "label": "2013",
            "population": 14,
            "objectConfig": {
                "color": "#2fad30",
                "objectId": [
                    "2013",
                    "Multiple methods",
                    14
                ]
            }
        },
        {
            "label": "2014",
            "population": 11,
            "objectConfig": {
                "color": "#2fad30",
                "objectId": [
                    "2014",
                    "Multiple methods",
                    11
                ]
            }
        },
        {
            "label": "2015",
            "population": 15,
            "objectConfig": {
                "color": "#2fad30",
                "objectId": [
                    "2015",
                    "Multiple methods",
                    15
                ]
            }
        },
        {
            "label": "2016",
            "population": 15,
            "objectConfig": {
                "color": "#2fad30",
                "objectId": [
                    "2016",
                    "Multiple methods",
                    15
                ]
            }
        },
        {
            "label": "2017",
            "population": 8,
            "objectConfig": {
                "color": "#2fad30",
                "objectId": [
                    "2017",
                    "Multiple methods",
                    8
                ]
            }
        },
        {
            "label": "2018",
            "population": 22,
            "objectConfig": {
                "color": "#2fad30",
                "objectId": [
                    "2018",
                    "Multiple methods",
                    22
                ]
            }
        },
        {
            "label": "2019",
            "population": 19,
            "objectConfig": {
                "color": "#2fad30",
                "objectId": [
                    "2019",
                    "Multiple methods",
                    19
                ]
            }
        },
        {
            "label": "2020",
            "population": 20,
            "objectConfig": {
                "color": "#2fad30",
                "objectId": [
                    "2020",
                    "Multiple methods",
                    20
                ]
            }
        },
        {
            "label": "2021",
            "population": 17,
            "objectConfig": {
                "color": "#2fad30",
                "objectId": [
                    "2021",
                    "Multiple methods",
                    17
                ]
            }
        },
        {
            "label": "2022",
            "population": 21,
            "objectConfig": {
                "color": "#2fad30",
                "objectId": [
                    "2022",
                    "Multiple methods",
                    21
                ]
            }
        },
        {
            "label": "2023",
            "population": 15,
            "objectConfig": {
                "color": "#2fad30",
                "objectId": [
                    "2023",
                    "Multiple methods",
                    15
                ]
            }
        },
        {
            "label": "2024",
            "population": 8,
            "objectConfig": {
                "color": "#2fad30",
                "objectId": [
                    "2024",
                    "Multiple methods",
                    8
                ]
            }
        }
    ],
    [
        {
            "label": "1988",
            "population": 1,
            "objectConfig": {
                "color": "#e71f8a",
                "objectId": [
                    "1988",
                    "Neutron",
                    1
                ]
            }
        },
        {
            "label": "1991",
            "population": 1,
            "objectConfig": {
                "color": "#e71f8a",
                "objectId": [
                    "1991",
                    "Neutron",
                    1
                ]
            }
        },
        {
            "label": "1999",
            "population": 2,
            "objectConfig": {
                "color": "#e71f8a",
                "objectId": [
                    "1999",
                    "Neutron",
                    2
                ]
            }
        },
        {
            "label": "2000",
            "population": 1,
            "objectConfig": {
                "color": "#e71f8a",
                "objectId": [
                    "2000",
                    "Neutron",
                    1
                ]
            }
        },
        {
            "label": "2001",
            "population": 2,
            "objectConfig": {
                "color": "#e71f8a",
                "objectId": [
                    "2001",
                    "Neutron",
                    2
                ]
            }
        },
        {
            "label": "2002",
            "population": 2,
            "objectConfig": {
                "color": "#e71f8a",
                "objectId": [
                    "2002",
                    "Neutron",
                    2
                ]
            }
        },
        {
            "label": "2004",
            "population": 2,
            "objectConfig": {
                "color": "#e71f8a",
                "objectId": [
                    "2004",
                    "Neutron",
                    2
                ]
            }
        },
        {
            "label": "2005",
            "population": 3,
            "objectConfig": {
                "color": "#e71f8a",
                "objectId": [
                    "2005",
                    "Neutron",
                    3
                ]
            }
        },
        {
            "label": "2006",
            "population": 1,
            "objectConfig": {
                "color": "#e71f8a",
                "objectId": [
                    "2006",
                    "Neutron",
                    1
                ]
            }
        },
        {
            "label": "2007",
            "population": 2,
            "objectConfig": {
                "color": "#e71f8a",
                "objectId": [
                    "2007",
                    "Neutron",
                    2
                ]
            }
        },
        {
            "label": "2008",
            "population": 5,
            "objectConfig": {
                "color": "#e71f8a",
                "objectId": [
                    "2008",
                    "Neutron",
                    5
                ]
            }
        },
        {
            "label": "2009",
            "population": 5,
            "objectConfig": {
                "color": "#e71f8a",
                "objectId": [
                    "2009",
                    "Neutron",
                    5
                ]
            }
        },
        {
            "label": "2010",
            "population": 4,
            "objectConfig": {
                "color": "#e71f8a",
                "objectId": [
                    "2010",
                    "Neutron",
                    4
                ]
            }
        },
        {
            "label": "2011",
            "population": 5,
            "objectConfig": {
                "color": "#e71f8a",
                "objectId": [
                    "2011",
                    "Neutron",
                    5
                ]
            }
        },
        {
            "label": "2012",
            "population": 4,
            "objectConfig": {
                "color": "#e71f8a",
                "objectId": [
                    "2012",
                    "Neutron",
                    4
                ]
            }
        },
        {
            "label": "2013",
            "population": 4,
            "objectConfig": {
                "color": "#e71f8a",
                "objectId": [
                    "2013",
                    "Neutron",
                    4
                ]
            }
        },
        {
            "label": "2014",
            "population": 2,
            "objectConfig": {
                "color": "#e71f8a",
                "objectId": [
                    "2014",
                    "Neutron",
                    2
                ]
            }
        },
        {
            "label": "2015",
            "population": 4,
            "objectConfig": {
                "color": "#e71f8a",
                "objectId": [
                    "2015",
                    "Neutron",
                    4
                ]
            }
        },
        {
            "label": "2016",
            "population": 4,
            "objectConfig": {
                "color": "#e71f8a",
                "objectId": [
                    "2016",
                    "Neutron",
                    4
                ]
            }
        },
        {
            "label": "2017",
            "population": 6,
            "objectConfig": {
                "color": "#e71f8a",
                "objectId": [
                    "2017",
                    "Neutron",
                    6
                ]
            }
        },
        {
            "label": "2018",
            "population": 6,
            "objectConfig": {
                "color": "#e71f8a",
                "objectId": [
                    "2018",
                    "Neutron",
                    6
                ]
            }
        },
        {
            "label": "2019",
            "population": 2,
            "objectConfig": {
                "color": "#e71f8a",
                "objectId": [
                    "2019",
                    "Neutron",
                    2
                ]
            }
        },
        {
            "label": "2020",
            "population": 1,
            "objectConfig": {
                "color": "#e71f8a",
                "objectId": [
                    "2020",
                    "Neutron",
                    1
                ]
            }
        },
        {
            "label": "2021",
            "population": 3,
            "objectConfig": {
                "color": "#e71f8a",
                "objectId": [
                    "2021",
                    "Neutron",
                    3
                ]
            }
        },
        {
            "label": "2022",
            "population": 3,
            "objectConfig": {
                "color": "#e71f8a",
                "objectId": [
                    "2022",
                    "Neutron",
                    3
                ]
            }
        },
        {
            "label": "2023",
            "population": 1,
            "objectConfig": {
                "color": "#e71f8a",
                "objectId": [
                    "2023",
                    "Neutron",
                    1
                ]
            }
        },
        {
            "label": "2024",
            "population": 6,
            "objectConfig": {
                "color": "#e71f8a",
                "objectId": [
                    "2024",
                    "Neutron",
                    6
                ]
            }
        }
    ],
    [
        {
            "label": "1989",
            "population": 2,
            "objectConfig": {
                "color": "#f60505",
                "objectId": [
                    "1989",
                    "NMR",
                    2
                ]
            }
        },
        {
            "label": "1990",
            "population": 7,
            "objectConfig": {
                "color": "#f60505",
                "objectId": [
                    "1990",
                    "NMR",
                    7
                ]
            }
        },
        {
            "label": "1991",
            "population": 23,
            "objectConfig": {
                "color": "#f60505",
                "objectId": [
                    "1991",
                    "NMR",
                    23
                ]
            }
        },
        {
            "label": "1992",
            "population": 11,
            "objectConfig": {
                "color": "#f60505",
                "objectId": [
                    "1992",
                    "NMR",
                    11
                ]
            }
        },
        {
            "label": "1993",
            "population": 74,
            "objectConfig": {
                "color": "#f60505",
                "objectId": [
                    "1993",
                    "NMR",
                    74
                ]
            }
        },
        {
            "label": "1994",
            "population": 222,
            "objectConfig": {
                "color": "#f60505",
                "objectId": [
                    "1994",
                    "NMR",
                    222
                ]
            }
        },
        {
            "label": "1995",
            "population": 190,
            "objectConfig": {
                "color": "#f60505",
                "objectId": [
                    "1995",
                    "NMR",
                    190
                ]
            }
        },
        {
            "label": "1996",
            "population": 187,
            "objectConfig": {
                "color": "#f60505",
                "objectId": [
                    "1996",
                    "NMR",
                    187
                ]
            }
        },
        {
            "label": "1997",
            "population": 329,
            "objectConfig": {
                "color": "#f60505",
                "objectId": [
                    "1997",
                    "NMR",
                    329
                ]
            }
        },
        {
            "label": "1998",
            "population": 331,
            "objectConfig": {
                "color": "#f60505",
                "objectId": [
                    "1998",
                    "NMR",
                    331
                ]
            }
        },
        {
            "label": "1999",
            "population": 389,
            "objectConfig": {
                "color": "#f60505",
                "objectId": [
                    "1999",
                    "NMR",
                    389
                ]
            }
        },
        {
            "label": "2000",
            "population": 370,
            "objectConfig": {
                "color": "#f60505",
                "objectId": [
                    "2000",
                    "NMR",
                    370
                ]
            }
        },
        {
            "label": "2001",
            "population": 414,
            "objectConfig": {
                "color": "#f60505",
                "objectId": [
                    "2001",
                    "NMR",
                    414
                ]
            }
        },
        {
            "label": "2002",
            "population": 441,
            "objectConfig": {
                "color": "#f60505",
                "objectId": [
                    "2002",
                    "NMR",
                    441
                ]
            }
        },
        {
            "label": "2003",
            "population": 529,
            "objectConfig": {
                "color": "#f60505",
                "objectId": [
                    "2003",
                    "NMR",
                    529
                ]
            }
        },
        {
            "label": "2004",
            "population": 727,
            "objectConfig": {
                "color": "#f60505",
                "objectId": [
                    "2004",
                    "NMR",
                    727
                ]
            }
        },
        {
            "label": "2005",
            "population": 874,
            "objectConfig": {
                "color": "#f60505",
                "objectId": [
                    "2005",
                    "NMR",
                    874
                ]
            }
        },
        {
            "label": "2006",
            "population": 860,
            "objectConfig": {
                "color": "#f60505",
                "objectId": [
                    "2006",
                    "NMR",
                    860
                ]
            }
        },
        {
            "label": "2007",
            "population": 965,
            "objectConfig": {
                "color": "#f60505",
                "objectId": [
                    "2007",
                    "NMR",
                    965
                ]
            }
        },
        {
            "label": "2008",
            "population": 652,
            "objectConfig": {
                "color": "#f60505",
                "objectId": [
                    "2008",
                    "NMR",
                    652
                ]
            }
        },
        {
            "label": "2009",
            "population": 563,
            "objectConfig": {
                "color": "#f60505",
                "objectId": [
                    "2009",
                    "NMR",
                    563
                ]
            }
        },
        {
            "label": "2010",
            "population": 513,
            "objectConfig": {
                "color": "#f60505",
                "objectId": [
                    "2010",
                    "NMR",
                    513
                ]
            }
        },
        {
            "label": "2011",
            "population": 516,
            "objectConfig": {
                "color": "#f60505",
                "objectId": [
                    "2011",
                    "NMR",
                    516
                ]
            }
        },
        {
            "label": "2012",
            "population": 536,
            "objectConfig": {
                "color": "#f60505",
                "objectId": [
                    "2012",
                    "NMR",
                    536
                ]
            }
        },
        {
            "label": "2013",
            "population": 496,
            "objectConfig": {
                "color": "#f60505",
                "objectId": [
                    "2013",
                    "NMR",
                    496
                ]
            }
        },
        {
            "label": "2014",
            "population": 549,
            "objectConfig": {
                "color": "#f60505",
                "objectId": [
                    "2014",
                    "NMR",
                    549
                ]
            }
        },
        {
            "label": "2015",
            "population": 431,
            "objectConfig": {
                "color": "#f60505",
                "objectId": [
                    "2015",
                    "NMR",
                    431
                ]
            }
        },
        {
            "label": "2016",
            "population": 449,
            "objectConfig": {
                "color": "#f60505",
                "objectId": [
                    "2016",
                    "NMR",
                    449
                ]
            }
        },
        {
            "label": "2017",
            "population": 412,
            "objectConfig": {
                "color": "#f60505",
                "objectId": [
                    "2017",
                    "NMR",
                    412
                ]
            }
        },
        {
            "label": "2018",
            "population": 392,
            "objectConfig": {
                "color": "#f60505",
                "objectId": [
                    "2018",
                    "NMR",
                    392
                ]
            }
        },
        {
            "label": "2019",
            "population": 380,
            "objectConfig": {
                "color": "#f60505",
                "objectId": [
                    "2019",
                    "NMR",
                    380
                ]
            }
        },
        {
            "label": "2020",
            "population": 381,
            "objectConfig": {
                "color": "#f60505",
                "objectId": [
                    "2020",
                    "NMR",
                    381
                ]
            }
        },
        {
            "label": "2021",
            "population": 360,
            "objectConfig": {
                "color": "#f60505",
                "objectId": [
                    "2021",
                    "NMR",
                    360
                ]
            }
        },
        {
            "label": "2022",
            "population": 301,
            "objectConfig": {
                "color": "#f60505",
                "objectId": [
                    "2022",
                    "NMR",
                    301
                ]
            }
        },
        {
            "label": "2023",
            "population": 272,
            "objectConfig": {
                "color": "#f60505",
                "objectId": [
                    "2023",
                    "NMR",
                    272
                ]
            }
        },
        {
            "label": "2024",
            "population": 183,
            "objectConfig": {
                "color": "#f60505",
                "objectId": [
                    "2024",
                    "NMR",
                    183
                ]
            }
        }
    ],
    [
        {
            "label": "1991",
            "population": 1,
            "objectConfig": {
                "color": "#a27206",
                "objectId": [
                    "1991",
                    "EM",
                    1
                ]
            }
        },
        {
            "label": "1996",
            "population": 1,
            "objectConfig": {
                "color": "#a27206",
                "objectId": [
                    "1996",
                    "EM",
                    1
                ]
            }
        },
        {
            "label": "1997",
            "population": 1,
            "objectConfig": {
                "color": "#a27206",
                "objectId": [
                    "1997",
                    "EM",
                    1
                ]
            }
        },
        {
            "label": "1998",
            "population": 2,
            "objectConfig": {
                "color": "#a27206",
                "objectId": [
                    "1998",
                    "EM",
                    2
                ]
            }
        },
        {
            "label": "1999",
            "population": 2,
            "objectConfig": {
                "color": "#a27206",
                "objectId": [
                    "1999",
                    "EM",
                    2
                ]
            }
        },
        {
            "label": "2000",
            "population": 14,
            "objectConfig": {
                "color": "#a27206",
                "objectId": [
                    "2000",
                    "EM",
                    14
                ]
            }
        },
        {
            "label": "2001",
            "population": 13,
            "objectConfig": {
                "color": "#a27206",
                "objectId": [
                    "2001",
                    "EM",
                    13
                ]
            }
        },
        {
            "label": "2002",
            "population": 25,
            "objectConfig": {
                "color": "#a27206",
                "objectId": [
                    "2002",
                    "EM",
                    25
                ]
            }
        },
        {
            "label": "2003",
            "population": 29,
            "objectConfig": {
                "color": "#a27206",
                "objectId": [
                    "2003",
                    "EM",
                    29
                ]
            }
        },
        {
            "label": "2004",
            "population": 15,
            "objectConfig": {
                "color": "#a27206",
                "objectId": [
                    "2004",
                    "EM",
                    15
                ]
            }
        },
        {
            "label": "2005",
            "population": 24,
            "objectConfig": {
                "color": "#a27206",
                "objectId": [
                    "2005",
                    "EM",
                    24
                ]
            }
        },
        {
            "label": "2006",
            "population": 29,
            "objectConfig": {
                "color": "#a27206",
                "objectId": [
                    "2006",
                    "EM",
                    29
                ]
            }
        },
        {
            "label": "2007",
            "population": 20,
            "objectConfig": {
                "color": "#a27206",
                "objectId": [
                    "2007",
                    "EM",
                    20
                ]
            }
        },
        {
            "label": "2008",
            "population": 43,
            "objectConfig": {
                "color": "#a27206",
                "objectId": [
                    "2008",
                    "EM",
                    43
                ]
            }
        },
        {
            "label": "2009",
            "population": 44,
            "objectConfig": {
                "color": "#a27206",
                "objectId": [
                    "2009",
                    "EM",
                    44
                ]
            }
        },
        {
            "label": "2010",
            "population": 57,
            "objectConfig": {
                "color": "#a27206",
                "objectId": [
                    "2010",
                    "EM",
                    57
                ]
            }
        },
        {
            "label": "2011",
            "population": 52,
            "objectConfig": {
                "color": "#a27206",
                "objectId": [
                    "2011",
                    "EM",
                    52
                ]
            }
        },
        {
            "label": "2012",
            "population": 67,
            "objectConfig": {
                "color": "#a27206",
                "objectId": [
                    "2012",
                    "EM",
                    67
                ]
            }
        },
        {
            "label": "2013",
            "population": 119,
            "objectConfig": {
                "color": "#a27206",
                "objectId": [
                    "2013",
                    "EM",
                    119
                ]
            }
        },
        {
            "label": "2014",
            "population": 192,
            "objectConfig": {
                "color": "#a27206",
                "objectId": [
                    "2014",
                    "EM",
                    192
                ]
            }
        },
        {
            "label": "2015",
            "population": 216,
            "objectConfig": {
                "color": "#a27206",
                "objectId": [
                    "2015",
                    "EM",
                    216
                ]
            }
        },
        {
            "label": "2016",
            "population": 412,
            "objectConfig": {
                "color": "#a27206",
                "objectId": [
                    "2016",
                    "EM",
                    412
                ]
            }
        },
        {
            "label": "2017",
            "population": 564,
            "objectConfig": {
                "color": "#a27206",
                "objectId": [
                    "2017",
                    "EM",
                    564
                ]
            }
        },
        {
            "label": "2018",
            "population": 882,
            "objectConfig": {
                "color": "#a27206",
                "objectId": [
                    "2018",
                    "EM",
                    882
                ]
            }
        },
        {
            "label": "2019",
            "population": 1451,
            "objectConfig": {
                "color": "#a27206",
                "objectId": [
                    "2019",
                    "EM",
                    1451
                ]
            }
        },
        {
            "label": "2020",
            "population": 2387,
            "objectConfig": {
                "color": "#a27206",
                "objectId": [
                    "2020",
                    "EM",
                    2387
                ]
            }
        },
        {
            "label": "2021",
            "population": 2951,
            "objectConfig": {
                "color": "#a27206",
                "objectId": [
                    "2021",
                    "EM",
                    2951
                ]
            }
        },
        {
            "label": "2022",
            "population": 4107,
            "objectConfig": {
                "color": "#a27206",
                "objectId": [
                    "2022",
                    "EM",
                    4107
                ]
            }
        },
        {
            "label": "2023",
            "population": 4579,
            "objectConfig": {
                "color": "#a27206",
                "objectId": [
                    "2023",
                    "EM",
                    4579
                ]
            }
        },
        {
            "label": "2024",
            "population": 3743,
            "objectConfig": {
                "color": "#a27206",
                "objectId": [
                    "2024",
                    "EM",
                    3743
                ]
            }
        }
    ],
    [
        {
            "label": "1995",
            "population": 1,
            "objectConfig": {
                "color": "#60e5bd",
                "objectId": [
                    "1995",
                    "Other",
                    1
                ]
            }
        },
        {
            "label": "1999",
            "population": 2,
            "objectConfig": {
                "color": "#60e5bd",
                "objectId": [
                    "1999",
                    "Other",
                    2
                ]
            }
        },
        {
            "label": "2000",
            "population": 2,
            "objectConfig": {
                "color": "#60e5bd",
                "objectId": [
                    "2000",
                    "Other",
                    2
                ]
            }
        },
        {
            "label": "2002",
            "population": 1,
            "objectConfig": {
                "color": "#60e5bd",
                "objectId": [
                    "2002",
                    "Other",
                    1
                ]
            }
        },
        {
            "label": "2003",
            "population": 1,
            "objectConfig": {
                "color": "#60e5bd",
                "objectId": [
                    "2003",
                    "Other",
                    1
                ]
            }
        },
        {
            "label": "2004",
            "population": 4,
            "objectConfig": {
                "color": "#60e5bd",
                "objectId": [
                    "2004",
                    "Other",
                    4
                ]
            }
        },
        {
            "label": "2005",
            "population": 5,
            "objectConfig": {
                "color": "#60e5bd",
                "objectId": [
                    "2005",
                    "Other",
                    5
                ]
            }
        },
        {
            "label": "2006",
            "population": 4,
            "objectConfig": {
                "color": "#60e5bd",
                "objectId": [
                    "2006",
                    "Other",
                    4
                ]
            }
        },
        {
            "label": "2007",
            "population": 5,
            "objectConfig": {
                "color": "#60e5bd",
                "objectId": [
                    "2007",
                    "Other",
                    5
                ]
            }
        },
        {
            "label": "2008",
            "population": 4,
            "objectConfig": {
                "color": "#60e5bd",
                "objectId": [
                    "2008",
                    "Other",
                    4
                ]
            }
        },
        {
            "label": "2009",
            "population": 7,
            "objectConfig": {
                "color": "#60e5bd",
                "objectId": [
                    "2009",
                    "Other",
                    7
                ]
            }
        },
        {
            "label": "2010",
            "population": 1,
            "objectConfig": {
                "color": "#60e5bd",
                "objectId": [
                    "2010",
                    "Other",
                    1
                ]
            }
        }
    ]
]

  // Transform rawData into the format that Chart.js expects
  const chartData = {
    labels: rawData[0].map((item: any) => item.label), // Assume all datasets share the same labels
    datasets: rawData.map((dataset: any[], index: number) => ({
      label: dataset[0].objectConfig.objectId[1], // Using the "X-ray", "Multiple methods", etc. as labels
      data: dataset.map(item => item.population),
      backgroundColor: dataset[0].objectConfig.color,
      borderColor: dataset[0].objectConfig.color,
      borderWidth: 1,
    })),
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        align: 'center',
        labels: {
          boxWidth: 40,
          padding: 20,
          font: {
            size: 14,
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            style: 'normal',
          },
          color: '#333',
          usePointStyle: false,
          pointStyle: 'circle',
        },
      },
      title: {
        display: true,
        text: 'PDB Data Distribution by Natural Source Organism',
        padding: {
          top: 20,
          bottom: 20,
        },
        font: {
          size: 20,
          family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          weight: 'bold',
        },
        color: '#333',
      },
      tooltip: {
        enabled: true,
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleFont: {
          size: 16,
          weight: 'bold',
        },
        bodyFont: {
          size: 14,
        },
        footerFont: {
          size: 12,
        },
        padding: 10,
        displayColors: true,
        borderColor: 'rgba(0,0,0,0)',
        borderWidth: 1,
        callbacks: {
          label: function (tooltipItem: { dataset: { label: string }, raw: any }) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
          title: function (tooltipItems: { label: string }[]) {
            return `Year: ${tooltipItems[0].label}`;
          },
          footer: function () {
            return 'Additional information';
          },
        },
      },
      filler: {
        propagate: true,
      },
    },
    scales: {
      x: {
        type: 'category' as const,
        display: true,
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: true,
          maxRotation: 45,
          minRotation: 0,
          font: {
            size: 12,
          },
          color: '#333',
        },
        title: {
          display: true,
          text: 'Year',
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#333',
        },
      },
      y: {
        type: 'linear' as const,
        display: true,
        stacked: true,
        beginAtZero: true,
        grid: {
          display: true,
          drawBorder: false,
          color: '#e4e4e4',
        },
        ticks: {
          stepSize: 1000,
          font: {
            size: 12,
          },
          color: '#333',
          callback: (value: number | string) => `${value}`,
        },
        title: {
          display: true,
          text: 'Population',
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#333',
        },
      },
    },
    elements: {
      bar: {
        borderWidth: 1,
        borderRadius: 4,
        hoverBackgroundColor: 'rgba(0,0,0,0.2)',
        hoverBorderColor: '#333',
      },
    },
    animation: {
      duration: 500,
      easing: 'easeInOutQuart',
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 20,
        bottom: 10,
      },
    },
  };
  
  return (
    <article className="col-12">
      <h4>PDB Data Distribution by Natural Source Organism</h4>

      <div>
        <BasicChart data={chartData} options={chartOptions} />
      </div>
    </article>
  );
};

export default DataDistribution;
