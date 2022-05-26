# Mammon Manager

Manage your mammon, and let not your mammon manage you.

## Development

This project is built with Next.js, Primsa, and PlanetScale.

To start, run `pscale auth login` to login from you console. Then run

```pscale connect mammon-manager development --port 3309```

to connect to your database on PlanetScale and serve it on your local `3309` port.

Next up, add or update your `.env` file at the root of the project, and add this line:

```DATABASE_URL="mysql://root@127.0.0.1:3309/mammon-manager"```

Then simply run `npm run dev` to start the app. You can also run `npx prisma studio` to start Prisma Studio, which provides a convenient view of the current database.

## Resources

### Authentication

- [Setting up magic.link with Next.js](https://vercel.com/blog/simple-auth-with-magic-link-and-nextjs)

### Component Libraries
- [Evergreen](https://evergreen.segment.com/)
- [Next UI](https://nextui.org/)
- [Chakra UI](https://chakra-ui.com/)
- [VisX](https://airbnb.io/visx/)
- [Grommet](https://v2.grommet.io/)
- [PrimeReact](https://www.primefaces.org/primereact/)

### Dashboard Templates
- https://material-ui.com/store/collections/free-react-dashboard/
- https://www.codeinwp.com/blog/react-ui-component-libraries-frameworks/
- https://github.com/DesignRevision/shards-dashboard-react