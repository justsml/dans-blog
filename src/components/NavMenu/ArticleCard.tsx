import { ListItem } from "./ListItem";

export const ArticleCard = ({post}: any) => {
  // console.warn("ArticleCard:", post?.data?.cover, post);
  const cover = post?.data?.cover_mobile.clone;

  // console.log("ArticleCard cover", cover);
  // useEffect(() => {
  //   console.log("ArticleCard post", post);
  //   if (smallImage instanceof Promise) {
  //     smallImage.then((image) => {
  //       setImage(image);
  //     });
  //   }
  // }, [smallImage]);

  return (<ListItem
    key={post.slug}
    title={post.data.title}
    href={`/${post.slug}/`}
    className="ArticleCard"
  >
    {cover && 'src' in cover && (
      <img
        src={cover.src}
        alt={post.data.title}
        width={50}
        height={50}
      />
    )}
    <small>{post.data.subTitle}</small>
  </ListItem>
)}