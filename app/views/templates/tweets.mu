<div class="panel panel-{{ theme }}">
    <div class="panel-heading"><img src="img/twitter_opt.png"><span class="twitter-user">@{{ user }}</span></div>
    <div class="panel-body">
        {{#items}}
        <div class="panel panel-default">
            <!-- Default panel contents -->
            <div class="panel-heading"><a href="{{{ url }}}" target="_blank"><span class="glyphicon glyphicon-link" aria-hidden="true"></span></a> {{ date }}</div>
            <div class="panel-body">
                <p>{{{ text }}}</p>
            </div>
        </div>
        {{/items}}
    </div>
</div>