import { PrismaClient, Prisma } from '@prisma/client'


const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    email: "Ulises_Dooley@gmail.com",
    password: "e220691b3e23647fc17c4b282bb469ac77fbadb8f5c77898294e42de95add560",
    role: 'customer',
  },
  {
    email: "Clarissa.Kunze@gmail.com",
    password: "e220691b3e23647fc17c4b282bb469ac77fbadb8f5c77898294e42de95add560",
    role: 'customer',
  },
  {
    email: "Deon_Johns@gmail.com",
    password: "e220691b3e23647fc17c4b282bb469ac77fbadb8f5c77898294e42de95add560",
    role: 'customer',
  },
  {
    email: "Keely_Cummings98@hotmail.com",
    password: "e220691b3e23647fc17c4b282bb469ac77fbadb8f5c77898294e42de95add560",
    role: 'customer',
  },
  {
    email: "Alexzander49@gmail.com",
    password: "e220691b3e23647fc17c4b282bb469ac77fbadb8f5c77898294e42de95add560",
    role: 'customer',
  },
  {
    email: "Lauren_Harvey@hotmail.com",
    password: "e220691b3e23647fc17c4b282bb469ac77fbadb8f5c77898294e42de95add560",
    role: 'volunteer',
  },
  {
    email: "Cassandre.Ernser25@gmail.com",
    password: "e220691b3e23647fc17c4b282bb469ac77fbadb8f5c77898294e42de95add560",
    role: 'volunteer',
  },
  {
    email: "Norbert_Sipes@hotmail.com",
    password: "e220691b3e23647fc17c4b282bb469ac77fbadb8f5c77898294e42de95add560",
    role: 'volunteer',
  },
  {
    email: "Aubree94@yahoo.com",
    password: "e220691b3e23647fc17c4b282bb469ac77fbadb8f5c77898294e42de95add560",
    role: 'admin',
  },
  {
    email: "Arvid_Beer@hotmail.com",
    password: "e220691b3e23647fc17c4b282bb469ac77fbadb8f5c77898294e42de95add560",
    role: 'customer',
  },
]


async function main() {
  console.log(`Start seeding ...`);

  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    
    console.log(`Created user with id: ${user.id}`);
  }

  console.log(`Seeding finished!`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })