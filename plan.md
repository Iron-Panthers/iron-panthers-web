Blog entries
	- How it's displayed on the main page
		- There should be a dedicated brief on what the blog entry is about that shows under the blog headline, date, author, and team/title
			- OR just take the first sentence or so from the blog entry
		- Link to the blog's own page
			- maybe keep the theme of the big banner image on top, like medium
			- support for videos, images in the text, maybe like medium as well?
			- this page should also have date, author, team/title
			- has the full text for the blog entry, of course
			- no comments section. 0 comments makes our site look dead
	- Mechanics
		- Have a text file on the server containing all blog entries, with parseable headline, date, author, team/title, etc. and the blog main text as well. Maybe we can put this into a json
		- In our js, parse this into some structures that we can then pass to angular to populate the page
			- this is where angular comes in, to show the whole blog post page without a major reload
			- can take advantage of the huge team banner and replace the image to fit the blog as needed

Other general ideas
	- Maybe have a small fixed header on top with our logo so we can return to the homepage easily, since we'll be playing around with the banner image
	- Navigation might be a bit too prominent. perhaps we should move all navigation up to the fixed header and include it in a drop down (the three line menu symbol). the info not the navigation is king