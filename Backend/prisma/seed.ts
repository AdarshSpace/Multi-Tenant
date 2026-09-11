import { prisma } from "../src/lib/DB";

async function main() {
   // Adarsh Space
   await prisma.tenant.upsert({
    where: {
      customDomain: "adarshspace.com",
    },
    update: {},
    create: {
      name: "Adarsh Space",
      subdomain: "adarshspace",
      slug: "adarshspace-com",
      customDomain: "adarshspace.com",
      isActive: true,
    },
  });

  // MotionKart
  await prisma.tenant.upsert({
    where: {
      customDomain: "motionkart.online",
    },
    update: {},
    create: {
      name: "MotionKart",
      subdomain: "motionkart",
      slug: "motionkart-online",
      customDomain: "motionkart.online",
      isActive: true,
    },
  });

  console.log("✅ Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
   
  })
  .finally(async () => {
    await prisma.$disconnect();
  });