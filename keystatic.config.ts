import { config, singleton, fields, collection } from "@keystatic/core"

export default config({
  storage: { kind: "local" },

  singletons: {

    settings: singleton({
      label: "Global links",
      path: "src/content/settings/global-links",
      format: { data: "json" },
      schema: {
        discordUrl: fields.url({ label: "Discord URL" }),
        twitterUrl: fields.url({ label: "Twitter URL" }),
        youtubeUrl: fields.url({ label: "Youtube URL" }),
        youtubevideoID: fields.text({ label: "Youtube video ID" }),
        kofiUrl: fields.url({ label: "Kofi URL" }),
        joinformUrl: fields.url({ label: "Join team form URL" }),
      },
    }),

  roadmappage: singleton({
      label: "Page: Roadmap",
      path: "src/content/pages/roadmap",
      format: { data: "json" },
      schema: {
        hero: fields.object({
          label: fields.text({ label: "Label" }),
          title: fields.text({ label: "Title" }),
          description: fields.text({ label: "Description", multiline: true }),
        }),
      },
    }),

      teampage: singleton({
      label: "Page: Team",
      path: "src/content/pages/team",
      format: { data: "json" },
      schema: {
        hero: fields.object({
          label: fields.text({ label: "Label" }),
          title: fields.text({ label: "Title" }),
          description: fields.text({ label: "Description", multiline: true }),
        }),
      },
    }),


      gallerypage: singleton({
      label: "Page: Gallery",
      path: "src/content/pages/gallery",
      format: { data: "json" },
      schema: {
        hero: fields.object({
          label: fields.text({ label: "Label" }),
          title: fields.text({ label: "Title" }),
          description: fields.text({ label: "Description", multiline: true }),
        }),
      },
    }),

  homepage: singleton({
  label: "Page: Home",
  path: "src/content/pages/home",
  format: { data: "json" },
  
  schema: {

    hero: fields.object(
      {
        label: fields.text({ label: "Label" }),
        title: fields.text({ label: "Title" }),
        text: fields.text({ label: "Subtext", multiline: true }),
      },
      { label: "Hero Section", description: "Website intro" },
    ),

    section1: fields.object(
      {
        label: fields.text({ label: "Label" }),
        title: fields.text({ label: "Title" }),
        subtitle: fields.text({ label: "Subtitle" }),
        text: fields.text({ label: "Subtext", multiline: true }),

        numbers: fields.array(
          fields.object({
            label: fields.text({ label: "Label" }),
            icon: fields.text({ label: "Icon phosphor(ex: ph:sword)", defaultValue: "ph:sparkle" }),
            number: fields.text({ label: "Number" }),
            text: fields.text({ label: "Text", multiline: true }),
          }),
          { label: "Numbers", itemLabel: (props) => props.fields.label.value || "Number" },
        ),
      },
      { label: "Section 1", description: "Section 1 + numbers" },
    ),

    section2: fields.object(
      {
        block1: fields.object(
          {
            label: fields.text({ label: "Label" }),
            title: fields.text({ label: "Title" }),
            text: fields.text({ label: "Text", multiline: true }),
            image: fields.image({
              label: "Image",
              directory: "public/images/homepage",
              publicPath: "/images/homepage/",
            }),
          },
          { label: "Bloc 1" },
        ),

        block2: fields.object(
          {
            label: fields.text({ label: "Label" }),
            title: fields.text({ label: "Title" }),
            text: fields.text({ label: "Text", multiline: true }),
            image: fields.image({
              label: "Image",
              directory: "public/images/homepage",
              publicPath: "/images/homepage/",
            }),
          },
          { label: "Bloc 2" },
        ),
      },
      { label: "Section 2", description: "Section 2 with image" },
    ),


    sectioncharacter: fields.object(
      {
        label: fields.text({ label: "Label" }),
        title: fields.text({ label: "Title" }),
        text: fields.text({ label: "Text", multiline: true }),
        image: fields.image({
          label: "Image",
          directory: "public/images/homepage",
          publicPath: "/images/homepage/",
        }),
      },
      { label: "Section Character", description: "Character presentation" },
    ),

    sectionclass: fields.object(
      {
        label: fields.text({ label: "Label" }),
        title: fields.text({ label: "Title" }),
        text: fields.text({ label: "Text", multiline: true }),
      },
      { label: "Section Class", description: "Classes teaser heading (cards come from the classes collection)" },
    ),

    gallery: fields.object(
      {
        label: fields.text({ label: "Label" }),
        title: fields.text({ label: "Title" }),
      },
      { label: "Gallery", description: "Gallery teaser heading" },
    ),

    roadmap: fields.object(
      {
        label: fields.text({ label: "Label" }),
        title: fields.text({ label: "Title" }),
        text: fields.text({ label: "Text", multiline: true }),
      },
      { label: "Roadmap", description: "Roadmap teaser heading (cards come from the collection)" },
    ),

    team: fields.object(
      {
        label: fields.text({ label: "Label" }),
        title: fields.text({ label: "Title" }),
        text: fields.text({ label: "Text", multiline: true }),
      },
      { label: "Team", description: "Team teaser heading (avatars + total come from the collection)" },
    ),

    news: fields.object(
      {
        label: fields.text({ label: "Label" }),
        title: fields.text({ label: "Title" }),
      },
      { label: "News", description: "News section heading (articles = blog collection)" },
    ),





      },
    }),

    characterpage: singleton({
      label: "Page: Character",
      path: "src/content/pages/character",
      format: { data: "json" },
      schema: {
        hero: fields.object(
          {
            label: fields.text({ label: "Label" }),
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
          },
          { label: "Hero", description: "Character page intro" },
        ),

        section1: fields.object(
          {
            block1: fields.object(
              {
                label: fields.text({ label: "Label" }),
                title: fields.text({ label: "Title" }),
                text: fields.text({ label: "Text", multiline: true }),
                image: fields.image({
                  label: "Image",
                  directory: "public/images/characterpage",
                  publicPath: "/images/characterpage/",
                }),
              },
              { label: "Bloc 1" },
            ),

            block2: fields.object(
              {
                label: fields.text({ label: "Label" }),
                title: fields.text({ label: "Title" }),
                text: fields.text({ label: "Text", multiline: true }),
                image: fields.image({
                  label: "Image",
                  directory: "public/images/characterpage",
                  publicPath: "/images/characterpage/",
                }),
              },
              { label: "Bloc 2" },
            ),
          },
          { label: "Section 1", description: "Lore (two text/image blocks)" },
        ),

        section2: fields.object(
          {
            label: fields.text({ label: "Label" }),
            title: fields.text({ label: "Title" }),
            blocks: fields.array(
              fields.object({
                title: fields.text({ label: "Subtitle" }),
                text: fields.text({ label: "Text", multiline: true }),
              }),
              { label: "Text blocks", itemLabel: (props) => props.fields.title.value || "Block" },
            ),
          },
          { label: "Section 2", description: "Long narrative section split into text blocks" },
        ),

        sectionclass: fields.object(
          {
            label: fields.text({ label: "Label" }),
            title: fields.text({ label: "Title" }),
            text: fields.text({ label: "Text", multiline: true }),
          },
          { label: "Section Class", description: "Paths heading (cards come from the classes collection)" },
        ),

        section3: fields.object(
          {
            label: fields.text({ label: "Label" }),
            title1: fields.text({ label: "Title 1" }),
            text1: fields.text({ label: "Text 1", multiline: true }),
            text2: fields.text({ label: "Text 2", multiline: true }),
            title2: fields.text({ label: "Title 2" }),
            text3: fields.text({ label: "Text 3", multiline: true }),
          },
          { label: "Section 3", description: "Editorial section (Beyond the stars / A vessel cosmic)" },
        ),
      },
    }),

    prefooter: singleton({
      label: "Prefooter",
      path: "src/content/sections/prefooter",
      format: { data: "json" },
      schema: {
        label: fields.text({ label: "Label" }),
        title: fields.text({ label: "Title" }),
        cards: fields.array(
          fields.object({
            icon: fields.text({ label: "Icon phosphor(ex: ph:discord-logo)", defaultValue: "ph:sparkle" }),
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            cta: fields.text({ label: "Button label" }),
            link: fields.url({ label: "Button link" }),
            primary: fields.checkbox({ label: "Filled button (primary)", defaultValue: false }),
            isTrailer: fields.checkbox({
              label: "Opens the trailer video (ignores the link)",
              defaultValue: false,
            }),
          }),
          { label: "Cards", itemLabel: (props) => props.fields.title.value || "Card" },
        ),
      },
    }),


  },

  collections: {
    classes: collection({
      label: "Classes",
      path: "src/content/classes/*",
      format: { data: "json" },
      slugField: "name",
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        tagline: fields.text({ label: "Tagline" }),
        description: fields.text({ label: "Description", multiline: true }),
        image: fields.image({
          label: "Image",
          directory: "public/images/classes",
          publicPath: "/images/classes/",
        }),

        spells: fields.array(
          fields.object({
            name: fields.text({ label: "Spell name" }),
            description: fields.text({ label: "Description", multiline: true }),
            image: fields.image({
              label: "Image",
              directory: "public/images/classes/spells",
              publicPath: "/images/classes/spells/",
            }),
          }),
          {
            label: "Spells",
            itemLabel: (props) => props.fields.name.value || "Spell",
          },
        ),
      },
    }),

    roadmap: collection({
      label: "Roadmap",
      path: "src/content/roadmap-categories/*",
      format: { data: "json" },
      slugField: "categorie",
      schema: {
        categorie: fields.slug({ name: { label: "categorie" } }),

        features: fields.array(
          fields.object({
            name: fields.text({ label: "Feature name" }),
            description: fields.text({ label: "Description", multiline: true }),
            icon: fields.text({ label: "Icon phosphor(ex: ph:sword)", defaultValue: "ph:sparkle", }),
            status: fields.select({
              label: "Status",
              options: [
                { label: "Completed", value: "completed" },
                { label: "In progress", value: "in-progress" },
                { label: "Planned", value: "planned" },
              ],
              defaultValue: "planned",
            }),
 
          }),
          {
            label: "feature",
            itemLabel: (props) => props.fields.name.value || "Feature",
          },
        ),

      },
    }),


    team: collection({
      label: "Team",
      path: "src/content/team/*",
      format: { data: "json" },
      slugField: "department",
      schema: {
        department: fields.slug({ name: { label: "Department" } }),

        members: fields.array(
          fields.object({
            name: fields.text({ label: "Name" }),
            role: fields.text({ label: "Role" }),
            avatar: fields.image({
              label: "Avatar",
              directory: "public/images/team",
              publicPath: "/images/team/",
            }),
            socials: fields.object({
              
               linkedin: fields.text({ label: "linkedin" }),
                website: fields.text({ label: "website" }),
                twitter: fields.text({ label: "twitter" }),
             
            }),
 
          }),
            {
              label: "Team member",
              itemLabel: (props) => props.fields.name.value || "Member",
            },
        ),

        openroles: fields.array(
          fields.text({ label: "Role" }),
          {
            label: "Open roles",
            itemLabel: (props) => props.value || "Role",
          },
        ),

      },
    }),


  news: collection({
    label: "News",
    path: "src/content/blog/*",
    slugField: "title",
    format: { contentField: "content" },
    schema: {
      title: fields.slug({ name: { label: "Title" } }),
      date: fields.date({ label: "Date" }),
      author: fields.text({ label: "Author" }),
      excerpt: fields.text({ label: "Excerpt", multiline: true }),
      cover: fields.image({
        label: "Cover",
        directory: "public/images/blog",
        publicPath: "/images/blog/",
      }),
      tags: fields.array(
        fields.text({ label: "Tag" }),
        { label: "Tags", itemLabel: (props) => props.value || "Tag" },
      ),
      draft: fields.checkbox({ label: "Draft", defaultValue: false }),
      content: fields.markdoc({ label: "Content" }),
    },
  }),



  },
})
