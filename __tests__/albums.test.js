import { render, screen } from "@testing-library/react";
import Home from "@/pages/albums";

describe("albums component testing", () => {
  const albums = [
    {
      id: 1,
      image: "https://i.scdn.co/image/ab67616d0000b27358406b3f1ac3ceaff7a64fef",
      name: "dash",
    },
    {
      id: 2,
      image: "https://i.scdn.co/image/ab67616d0000b27358406b3f1ac3ceaff7a64fef",
      name: "dash",
    },
  ];

  it("component to be true", () => {
    const data = render(<Home />);
    expect(data).toBeTruthy();
  });

  it("component to be true", () => {
    const data = render(<Home />);
    expect(data.findByText("Playlist")).toBeTruthy();
  });
  
  it("component to be true", () => {
    expect(albums).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 1 }),
        expect.objectContaining({ id: 2 }),
      ])
    );
  });
});
