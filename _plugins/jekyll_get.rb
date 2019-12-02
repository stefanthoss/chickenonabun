require 'json'
require 'hash-joiner'
require 'open-uri'

# https://github.com/18F/jekyll-get
module JekyllGet
  class Generator < Jekyll::Generator
    safe true
    priority :highest

    def generate(site)
      config = site.config['jekyll_get']
      return unless config
      config = [config] unless config.is_a?(Array)
      config.each do |d|
        target = site.data[d['data']]
        source = JSON.parse(open(d['json']))
        if target
          HashJoiner.deep_merge target, source
        else
          site.data[d['data']] = source
        end
        if d['cache']
          data_source = (site.config['data_source'] || '_data')
          path = "#{data_source}/#{d['data']}.json"
          open(path, 'wb') do |file|
            file << JSON.generate(site.data[d['data']])
          end
        end
      rescue
        next
      end
    end
  end
end
