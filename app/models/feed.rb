require 'rss'
class Feed < ActiveRecord::Base
  belongs_to :user

  validates :url, presence: true
  validates_format_of :url, :with => URI::regexp(%w(http https))


  def self.feedjira_index(feeds)
    arr_feeds = []
    urls = []
    feeds.each do |feed|
      urls.push feed.url
    end
    feedjira_feeds = Feedjira::Feed.fetch_and_parse urls


    id_count = 0
    feedjira_feeds.each{ |key, feed|
      this_id = feeds[id_count].id
      id_count += 1
      arr_feeds.push({
        title: feed.title,
        description: feed.description,
        url: feed.url,
        id: this_id,
        entries: feed.entries.map { |entry| 
          entry.inject({}) { |obj, attr| 
            obj[attr[0]] = attr[1]; 
            obj 
          } 
        }
      })
    }
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
    return this_feed
  end
end
