require 'json'

class GeocodeAddressTag < Liquid::Tag
  def initialize(tag_name, content, tokens)
    super
    @content = content
  end

  def render(context)
    url = "https://nominatim.openstreetmap.org/search?format=json&limit=1&q=#{context[@content]}"
    results = JSON.load(open(URI.encode(url)))
    "[#{results.first['lat']},#{results.first['lon']}]" if results.any?
  end

  Liquid::Template.register_tag 'geocode_address', self
end
