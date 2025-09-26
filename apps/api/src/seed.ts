import bcrypt from 'bcryptjs';
import { connectDatabase, disconnectDatabase } from './config/database';
import { env } from './config/env';
import { User } from './models/User';
import { Setting } from './models/Setting';
import { Project } from './models/Project';
import { Post } from './models/Post';
import { Skill } from './models/Skill';
import { Experience } from './models/Experience';

async function seed() {
  await connectDatabase();

  const hashedPassword = await bcrypt.hash(env.adminPassword, 10);
  await User.findOneAndUpdate(
    { email: env.adminEmail },
    { email: env.adminEmail, password: hashedPassword, role: 'admin' },
    { upsert: true, new: true }
  );

  await Setting.findOneAndUpdate(
    {},
    {
      siteName: 'Portfolio CMS',
      heroTitle: 'Hi, I design and build web experiences.',
      heroSubtitle: 'Full-stack engineer specialising in React, TypeScript, and performant Node APIs.',
      theme: 'system',
      seo: {
        title: 'Portfolio CMS',
        description: 'A modern portfolio with integrated CMS and blog.',
        keywords: ['portfolio', 'developer', 'blog']
      },
      social: {
        twitter: 'https://twitter.com/example',
        github: 'https://github.com/example',
        linkedin: 'https://linkedin.com/in/example'
      },
      contactEmail: env.adminEmail
    },
    { upsert: true }
  );

  if ((await Project.countDocuments()) === 0) {
    await Project.create({
      title: 'Design System Revamp',
      slug: 'design-system-revamp',
      summary: 'Rebuilt component library with accessibility-first approach.',
      content: '# Design System Revamp\n\nImplemented a scalable design system with reusable primitives.',
      tech: ['React', 'TypeScript', 'Storybook'],
      repoUrl: 'https://github.com/example/design-system',
      demoUrl: 'https://design-system.example.com',
      coverImage: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c',
      status: 'published',
      featured: true
    });
  }

  if ((await Post.countDocuments()) === 0) {
    await Post.create({
      title: 'Shipping Faster with Monorepos',
      slug: 'shipping-faster-with-monorepos',
      excerpt: 'A deep dive into why monorepos improve collaboration.',
      content: '## Benefits\n\nMonorepos streamline dependency sharing and code reuse.',
      coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
      tags: ['JavaScript', 'DevOps'],
      status: 'published'
    });
  }

  if ((await Skill.countDocuments()) === 0) {
    await Skill.insertMany([
      { name: 'React', level: 'Expert', category: 'Frontend' },
      { name: 'Node.js', level: 'Advanced', category: 'Backend' },
      { name: 'TypeScript', level: 'Advanced', category: 'Frontend' }
    ]);
  }

  if ((await Experience.countDocuments()) === 0) {
    await Experience.create({
      role: 'Senior Software Engineer',
      company: 'Acme Corp',
      description: 'Led frontend platform initiatives and improved DX.',
      startDate: new Date('2021-01-01')
    });
  }

  console.log('Seed complete');
  await disconnectDatabase();
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
