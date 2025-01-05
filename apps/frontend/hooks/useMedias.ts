import dayjs from 'dayjs'
import Media from 'models/Media'

const list = [
  {
    path: '1680974173000.jpeg',
    story: 'Hey!',
    aspectRatio: 1.3333333333333333,
  },
  {
    path: '1680974174000.jpeg',
    story: "C'est qui ce chat?",
    aspectRatio: 1.3333333333333333,
  },
  {
    path: '1682950224000.jpeg',
    story: "Tu t'es perdu? Mais vas y rentre, on adore les chats!",
    aspectRatio: 1.3333333333333333,
  },
  {
    path: '1683215486000.jpeg',
    story: "A partir d'aujourd'hui, on te nourrira tous les jours",
    aspectRatio: 1.3333333333333333,
  },
  {
    path: '1683215956000.jpeg',
    story: '',
    aspectRatio: 1.3333333333333333,
  },
  {
    path: '1683285147000.jpeg',
    story: 'On se fait des potes on dirait!',
    aspectRatio: 1.3333333333333333,
  },
  {
    path: '1683286404000.jpeg',
    story: '',
    aspectRatio: 1.3333333333333333,
  },
  {
    path: '1686054166000.jpeg',
    story: '',
    aspectRatio: 1.3333333333333333,
  },
  {
    path: '1686054169000.jpeg',
    story: '',
    aspectRatio: 1.3333333333333333,
  },
  {
    path: '1686430174000.jpeg',
    story: 'On prend ses aises!',
    aspectRatio: 0.75,
  },
  {
    path: '1688602120000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1693001204000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1693003387000.jpeg',
    story: '',
    aspectRatio: 1.3333333333333333,
  },
  {
    path: '1694719621000.jpeg',
    story: '',
    aspectRatio: 1.3333333333333333,
  },
  {
    path: '1694719632000.jpeg',
    story: '',
    aspectRatio: 1.3333333333333333,
  },
  {
    path: '1694719691000.jpeg',
    story: '',
    aspectRatio: 1.3333333333333333,
  },
  {
    path: '1694719826000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1694847061000.jpeg',
    story: "OMG, c'est quoi dans son cou?",
    aspectRatio: 0.75,
  },
  {
    path: '1694847141000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1694847183000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1694847235000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1698672844000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1698672865000.jpeg',
    story: 'Mais ça empire! Kumea en urgence!',
    aspectRatio: 0.75,
  },
  {
    path: '1702529688000.jpeg',
    story: "Après plus d'1 mois de soin. Relaché dans son quartier",
    aspectRatio: 0.75,
  },
  {
    path: '1702588008000.jpeg',
    story: '',
    aspectRatio: 1.3333333333333333,
  },
  {
    path: '1703868390000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1705701616000.jpeg',
    story: '',
    aspectRatio: 1.3333333333333333,
  },
  {
    path: '1705701634000.jpeg',
    story: '',
    aspectRatio: 1.3333333333333333,
  },
  {
    path: '1705701635000.jpeg',
    story: '',
    aspectRatio: 1.3333333333333333,
  },
  {
    path: '1705701695000.jpeg',
    story: '',
    aspectRatio: 1.3333333333333333,
  },
  {
    path: '1705701703000.jpeg',
    story: '',
    aspectRatio: 1.3333333333333333,
  },
  {
    path: '1705701710000.jpeg',
    story: '',
    aspectRatio: 1.3333333333333333,
  },
  {
    path: '1705816939000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1706364428000.jpeg',
    story: 'On dirait que ça revient...',
    aspectRatio: 0.75,
  },
  {
    path: '1706364436000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1706514718000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1709139301000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1709140397000.jpeg',
    story: '',
    aspectRatio: 1.3333333333333333,
  },
  {
    path: '1713445259000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1714492368000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1714492446000.jpeg',
    story: 'Ca va mieux on dirait',
    aspectRatio: 0.75,
  },
  {
    path: '1720549261000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1723345643000.jpeg',
    story:
      "On a jamais été aussi inquiet.. tu as disparu 2 semaines complètes on t'as même PetAlert!",
    aspectRatio: 0.75,
  },
  {
    path: '1724271964000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1725360995000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1725954591000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1725954595000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1725954609000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1725954647000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1725958704000.jpeg',
    story: 'f',
    aspectRatio: 0.75,
  },
  {
    path: '1726224170000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1726224177000.jpeg',
    story: 'On dirait que ça revient...',
    aspectRatio: 0.75,
  },
  {
    path: '1726224193000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1726235020000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1726906840000.jpeg',
    story: '',
    aspectRatio: 1.3333333333333333,
  },
  {
    path: '1726906890000.jpeg',
    story: '',
    aspectRatio: 1.3333333333333333,
  },
  {
    path: '1726906894000.jpeg',
    story: '',
    aspectRatio: 1.3333333333333333,
  },
  {
    path: '1726906899000.jpeg',
    story: 'r',
    aspectRatio: 1.3333333333333333,
  },
  {
    path: '1726906904000.jpeg',
    story: '',
    aspectRatio: 1.3333333333333333,
  },
  {
    path: '1726906908000.jpeg',
    story: '',
    aspectRatio: 1.3333333333333333,
  },
  {
    path: '1726906910000.jpeg',
    story: '',
    aspectRatio: 1.3333333333333333,
  },
  {
    path: '1727295996000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1727432949000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1727432965000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1727432984000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1727432999000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1727507494000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1727507497000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1727507518000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1727507522000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1728921654000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1728921817000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1728921995000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1728921998000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1729036765000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1729110232000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1729630615000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1729631243000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1730009806000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1730009835000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1730096072000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1730105413000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1730228865000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1730278697000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1730278699000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1732117309000.jpeg',
    story: 'Voilà, cette fois ci tu es sauvé pour de bon et pour longtemps!',
    aspectRatio: 0.75,
  },
  {
    path: '1732123972000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1732380177000.jpeg',
    story: '',
    aspectRatio: 0.75,
  },
  {
    path: '1735894309000.jpeg',
    story: "En route pour ta nouvelle famille d'accueil",
    aspectRatio: 0.75,
  },
]

const useMedias = () => ({
  data: list.map(file => ({
    id: file.path,
    story: file.story,
    aspectRatio: file.aspectRatio,
    date: dayjs(parseInt(file.path.split('.')[0])).toDate(),
    picture: `https://ik.imagekit.io/nd0koqz3s/chatdoron/${file.path}`,
  })) as Media[],
})

export default useMedias
