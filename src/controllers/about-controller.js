export const aboutController = {
  index: {
    handler: function (request, h) {
      const viewData = {
        title: "About Venuely",
      };
      return h.view("about-view", viewData);
    },
  },
};
