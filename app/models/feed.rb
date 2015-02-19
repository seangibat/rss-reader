require 'rss'
class Feed < ActiveRecord::Base
  belongs_to :user

  validates :url, presence: true
  validates_format_of :url, :with => URI::regexp(%w(http https))


  def self.feedjira_index(feeds)
    arr_feeds = []
    urls = []
    feeds.each do |feed|
      # urls.push feed.url

      this_feed = Feedjira::Feed.fetch_and_parse feed.url

      this_feed.entries = this_feed.entries.map { |entry| 
        entry.inject({}) { |obj, attr| 
          obj[attr[0]] = attr[1]; 
          obj 
        } 
      }

      arr_feeds.push({
        id: feed.id, 
        title: this_feed.title, 
        description: this_feed.description,
        url: this_feed.url,
        entries: this_feed.entries
        })
    end

    # feedjira_feeds = Feedjira::Feed.fetch_and_parse urls

    # puts feeds

    # feedjira_feeds.each{ |key, feed|

    #   this_feed = feeds.select { |f| puts f.url; f.url.include?(feed.url) }
    #   puts feed.url
    #   puts this_feed
 
    #   arr_feeds.push({
    #     title: feed.title,
    #     description: feed.description,
    #     url: feed.url,
    #     id: this_feed.first.id,
    #     entries: feed.entries.map { |entry| 
    #       entry.inject({}) { |obj, attr| 
    #         obj[attr[0]] = attr[1]; 
    #         obj 
    #       } 
    #     }
    #   })
    # }

    return arr_feeds
  end

  def self.feedjira_show(feed)
    this_feed = Feedjira::Feed.fetch_and_parse feed.url

    this_feed.entries = this_feed.entries.map { |entry| 
      entry.inject({}) { |obj, attr| 
        obj[attr[0]] = attr[1]; 
        obj 
      } 
    }

    big_object = {
      id: feed.id, 
      title: this_feed.title, 
      description: this_feed.description,
      url: this_feed.url,
      entries: this_feed.entries
    }

    return big_object
  end
end
